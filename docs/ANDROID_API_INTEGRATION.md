# Bakery API integration guide for Android

This document describes the HTTP API exposed by the Bakery server and the
Android client behavior required to consume it.

## 1. Base URL and transport

Production base URL:

```text
https://bakeryapp-server.onrender.com
```

All paths below are relative to this URL. Use HTTPS in production. The API
returns JSON unless an endpoint is explicitly marked as multipart.

For a local Android emulator, the server running on the development machine is
usually reachable at:

```text
http://10.0.2.2:5000
```

The Android manifest must include:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Do not enable cleartext traffic for production. If HTTP is needed locally,
configure it only in the debug build.

## 2. Authentication

### Login or signup

Successful `POST /api/auth/signup` and `POST /api/auth/login` responses contain
an access token and a user object:

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_OBJECT_ID",
    "name": "Asha",
    "email": "asha@example.com",
    "role": "user"
  }
}
```

Store the token securely (prefer Android Keystore-backed encrypted storage).
Store the user object only as convenience UI state; the token is the
credential.

Every protected request must include exactly:

```http
Authorization: Bearer JWT_TOKEN
```

Do not send `Bearer` twice. Read the latest token immediately before a request
rather than caching a possibly stale value. On `401`, clear the local session
and send the user to login. A `403` means the token is valid but the requested
operation is not permitted.

### Auth endpoints

#### `POST /api/auth/signup`

Headers: `Content-Type: application/json`

Body:

```json
{
  "name": "Asha",
  "email": "asha@example.com",
  "password": "secret"
}
```

Server behavior:

- `email` must be unique; duplicate email returns `400`.
- Password is hashed before storage.
- New accounts receive role `user`.
- A JWT is returned immediately.

Recommended Android validation:

- Name: required after trimming.
- Email: required and valid email format.
- Password: required; use at least 8 characters in the app.
- Never log the password or token.

Possible errors:

```json
{ "success": false, "message": "Email already exists" }
```

#### `POST /api/auth/login`

Headers: `Content-Type: application/json`

Body:

```json
{
  "email": "asha@example.com",
  "password": "secret"
}
```

Invalid email/password returns `400` with `Invalid Credentials`.

#### `POST /api/auth/logout`

No authentication is required by the current server. Call it if desired, then
always remove the locally stored token and user. The current server does not
revoke JWTs, so local deletion is the effective logout action.

## 3. Common response and error handling

Successful responses generally contain `success: true`. Error responses
generally contain:

```json
{
  "success": false,
  "message": "Human-readable error"
}
```

Handle these statuses:

| Status | Meaning | Android action |
|---|---|---|
| 200 | Successful read/update/delete | Update local state |
| 201 | Resource created | Insert returned resource into state |
| 400 | Invalid input or invalid state | Show `message` beside/toast |
| 401 | Missing/invalid/expired JWT | Clear session and login |
| 403 | Authenticated but forbidden | Show permission/state message |
| 404 | Resource does not exist | Show not-found UI |
| 500 | Server, database, upload, or payment configuration error | Show retryable error; do not assume success |

Always parse the response body safely. Network timeouts, DNS errors, and
malformed responses are transport failures and should be shown separately from
an API error.

## 4. Cake/catalog APIs

### `GET /api/cakes`

Public. Returns all cakes:

```json
{
  "success": true,
  "cakes": [
    {
      "_id": "CAKE_OBJECT_ID",
      "name": "Chocolate Cake",
      "description": "Rich chocolate sponge",
      "price": 850,
      "category": "Chocolate",
      "images": ["https://..."],
      "weight": "1kg",
      "flavor": "Chocolate",
      "eggless": false,
      "available": true,
      "ratings": 4.5,
      "totalReviews": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

Use `_id` as the stable identifier. Do not use the array index as an ID.
`images` contains Cloudinary URLs and may contain multiple entries.

### `GET /api/cakes/{cakeId}`

Public. Returns `{ "success": true, "cake": { ... } }`. A missing cake returns
`404`.

### `POST /api/cakes`

Admin only. This is `multipart/form-data`; do not manually set the
`Content-Type` boundary.

Parts:

| Part | Type | Required | Allowed values |
|---|---|---:|---|
| `name` | text | yes | Non-empty string |
| `description` | text | yes | Non-empty string |
| `price` | decimal text | yes | Number >= 0 |
| `category` | text | yes | `Birthday`, `Wedding`, `Anniversary`, `Cupcake`, `Pastry`, `Chocolate`, `Fruit`, `Custom` |
| `weight` | text | yes | `0.5kg`, `1kg`, `1.5kg`, `2kg`, `3kg`, `5kg` |
| `flavor` | text | yes | Non-empty string |
| `eggless` | text | no | `true` or `false`; defaults to false |
| `images` | file | yes | Up to 5; jpg, jpeg, png, webp, or avif |

The field name for every image must be `images`. The server uploads files to
Cloudinary and stores the resulting URLs in the cake document.

Recommended client validation before upload:

- Select 1 to 5 images.
- Reject unsupported MIME types and optionally cap file size (the server
  currently limits format/count, not file size).
- Validate price as a finite number >= 0.
- Trim required text fields.
- Send `eggless` as the lowercase string `true` or `false`.

Success: `201` with `{ "success": true, "cake": { ... } }`.

### `PUT /api/cakes/{cakeId}`

Admin only. Same multipart format as create, but fields can be sent as a
partial update. If at least one `images` file is uploaded, it replaces the
existing `images` array; it does not append to it. If no files are sent,
existing images remain unchanged.

Success: `200` with the updated cake. A nonexistent ID currently may return a
success response with `cake: null`; the Android client should treat a null cake
as not found.

### `DELETE /api/cakes/{cakeId}/delete`

Admin only. Deletes the cake document and returns:

```json
{
  "success": true,
  "message": "Cake deleted successfully"
}
```

This route does not delete related bookings/reviews or the Cloudinary assets.
Refresh catalog state after deletion.

## 5. Review APIs

### `GET /api/cakes/{cakeId}/reviews`

Public. Returns:

```json
{
  "success": true,
  "reviews": [
    {
      "_id": "REVIEW_OBJECT_ID",
      "productId": "CAKE_OBJECT_ID",
      "user": {
        "_id": "USER_OBJECT_ID",
        "name": "Asha",
        "role": "user"
      },
      "rating": 5,
      "review": "Excellent cake",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### `POST /api/cakes/{cakeId}/reviews`

Authenticated. JSON body:

```json
{
  "rating": 5,
  "review": "Excellent cake"
}
```

Validation and rules:

- `rating` must be numeric from 1 through 5.
- Review text is trimmed and must contain at least 3 characters.
- The user must have a `Delivered` booking for this cake.
- A user can review a cake only once.
- On success, product `ratings` and `totalReviews` are recalculated.

`403` means the purchase is not delivered; `400` means invalid input or an
existing review.

### `DELETE /api/cakes/{cakeId}/reviews/{reviewId}`

Authenticated. The review owner or an admin can delete it. The server
recalculates the cake rating after deletion.

## 6. Booking APIs

All booking endpoints below require `Authorization`.

### `POST /api/bookings`

Creates an unpaid/pending booking directly. JSON body:

```json
{
  "cakeId": "CAKE_OBJECT_ID",
  "quantity": 2,
  "deliveryAddress": "12 Main Street, Pune",
  "phone": "9876543210",
  "deliveryDate": "2026-10-01"
}
```

Server behavior:

- Looks up the cake.
- Calculates `totalPrice` as the current cake price multiplied by quantity.
- Sets `paymentStatus` to `Pending` and `orderStatus` to `Pending`.
- Associates the booking with the authenticated user.

Recommended client validation:

- `cakeId` must be a valid selected cake.
- Quantity must be an integer >= 1.
- Address and phone are required.
- For this app, validate an Indian mobile number with `^[6-9]\\d{9}$`.
- Delivery date is required and should not be in the past.

Success: `201` with `message` and `booking`.

### `GET /api/bookings/my`

Authenticated. Returns the current user's bookings, populated with cake data.
Use `booking._id` for details/cancel operations.

### `GET /api/bookings/{bookingId}`

Authenticated. Owners and admins can read a booking. Other users receive
`403`. The response populates both `cake` and `user`.

### `PUT /api/bookings/{bookingId}/cancel`

Authenticated owner only. No body is required. Cancellation is allowed only
when `orderStatus` is `Pending`. Success returns the changed booking with
`orderStatus: "Cancelled"`.

### `GET /api/bookings/all`

Admin only. Returns all bookings, newest first, with user name/email and cake
data populated.

### `PUT /api/bookings/{bookingId}/status`

Admin only. JSON body:

```json
{
  "orderStatus": "Preparing"
}
```

Allowed values are `Pending`, `Accepted`, `Preparing`, `Out For Delivery`,
`Delivered`, and `Cancelled`. The Android admin UI should use a fixed dropdown
of these values and never allow arbitrary text.

## 7. Razorpay payment flow

The intended paid-order flow is:

1. Calculate the displayed amount from the selected cake and quantity.
2. Call `POST /api/payment/create-order`.
3. Open the Razorpay Android checkout using the returned order ID and amount.
4. Receive Razorpay callback values.
5. Call `POST /api/payment/verify` with the callback and booking details.
6. Treat the booking as paid only after verification returns `201`.
7. Refresh bookings from `GET /api/bookings/my`.

### `POST /api/payment/create-order`

Authenticated. JSON body:

```json
{
  "amount": 1700
}
```

Success:

```json
{
  "success": true,
  "order": {
    "id": "order_...",
    "entity": "order",
    "amount": 170000,
    "amount_paid": 0,
    "amount_due": 170000,
    "currency": "INR",
    "receipt": "receipt_...",
    "status": "created"
  }
}
```

The API expects rupees and converts to paise. The checkout receives the
returned `order.amount` in paise. The server currently does not validate that
the client amount equals a server-calculated cart total, so the Android app
must display and submit the exact selected cake price multiplied by quantity.

### `POST /api/payment/verify`

Authenticated. JSON body:

```json
{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "signature...",
  "cakeId": "CAKE_OBJECT_ID",
  "quantity": 2,
  "deliveryAddress": "12 Main Street, Pune",
  "phone": "9876543210",
  "deliveryDate": "2026-10-01"
}
```

The server verifies the HMAC signature using its private
`RAZORPAY_KEY_SECRET`, then creates a booking with `paymentStatus: "Paid"`.
Never calculate or verify the signature in Android and never ship
`RAZORPAY_KEY_SECRET` in the APK.

The public Razorpay key ID may be included in the checkout configuration. Keep
the private key only in server environment variables. If a private credential
has ever been committed or exposed, rotate it immediately.

## 8. Chatbot APIs

### `POST /api/chat`

Authenticated. JSON body:

```json
{
  "message": "Which chocolate cakes are available?"
}
```

`message` is required. Success:

```json
{
  "success": true,
  "answer": "..."
}
```

The server stores both the user message and assistant answer against the
authenticated user. Show a loading state and prevent duplicate sends while a
request is active.

### `GET /api/chat/history`

Authenticated. Returns:

```json
{
  "success": true,
  "history": [
    {
      "role": "user",
      "content": "Which chocolate cakes are available?"
    },
    {
      "role": "assistant",
      "content": "..."
    }
  ]
}
```

## 9. Retrofit/Kotlin request patterns

Example models can use nullable fields for error-tolerant parsing:

```kotlin
data class ApiError(val success: Boolean? = null, val message: String? = null)

data class AuthResponse(
    val success: Boolean,
    val token: String?,
    val user: User?
)

data class User(val id: String, val name: String, val email: String, val role: String)

data class Cake(
    val _id: String,
    val name: String,
    val description: String,
    val price: Double,
    val category: String,
    val images: List<String>,
    val weight: String,
    val flavor: String,
    val eggless: Boolean,
    val available: Boolean,
    val ratings: Double,
    val totalReviews: Int
)
```

Use an OkHttp interceptor so every protected request gets the current token:

```kotlin
class AuthInterceptor(private val tokenStore: TokenStore) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = tokenStore.getToken()
        val request = chain.request().newBuilder().apply {
            if (!token.isNullOrBlank()) {
                header("Authorization", "Bearer ${token.removePrefix("Bearer ").trim()}")
            }
        }.build()
        return chain.proceed(request)
    }
}
```

For multipart cake upload, use one `MultipartBody.Part` per image with the
same name `images`, plus text `RequestBody` parts. Let Retrofit/OkHttp set the
multipart content type and boundary.

## 10. State mutation rules for the Android app

- After login/signup, replace the session token and user atomically.
- After creating or updating a cake, replace the matching catalog item with the
  returned `cake`; do not guess server defaults.
- After deleting a cake, remove it from the local list only after a successful
  response, then refresh if the screen is still active.
- After creating/verifying a booking, use the returned booking and then reload
  `/api/bookings/my`.
- After cancellation/status changes, update the returned booking and refresh
  lists to avoid stale populated cake/user data.
- After review create/delete, refresh the cake and review list because
  `ratings` and `totalReviews` change.
- Treat payment callback success as provisional until `/api/payment/verify`
  succeeds.
- Do not persist passwords, payment signatures, or private API credentials.

## 11. Important current server limitations

The Android client should compensate for these gaps until server validation is
strengthened:

- Booking and payment verification do not enforce all required fields before
  database creation.
- Booking quantity and payment amount are not fully cross-checked server-side.
- Cake update does not explicitly return `404` for a missing cake.
- Delete cake does not remove reviews, bookings, or Cloudinary files.
- JWT logout does not revoke an already-issued token.
- Multer limits image count and format, but no explicit file-size limit is set.

These are reasons to validate in the Android UI, not reasons to trust client
input on a security boundary. The server should eventually enforce the same
rules independently.

## 12. Complete frontend screen map

The web frontend defines the following screens. An Android app should provide
equivalent destinations, navigation, and access rules.

| Web route | Android screen | Login/admin requirement | Main data |
|---|---|---|---|
| `/` | Home | Public | Featured/all cakes |
| `/cakes` | Cake catalogue | Public | Cake list |
| `/cake/{id}` | Cake details | Public; admin controls conditional | One cake, reviews |
| `/cake/{id}/buy` | Buy cake | Login required before payment | Cake, delivery form, payment |
| `/about` | About | Public | Static content |
| `/contact` | Contact | Public | Static content |
| `/signup` | Sign up | Public | New account form |
| `/login` | Login | Public | Session creation |
| `/my-bookings` | My orders | Authenticated | Current user's bookings |
| `/profile` | Profile | Authenticated | Stored user details |
| `/cart` | Cart | Public | Locally stored cart |
| `/add-cake` | Add cake | Admin | Cake form and images |
| `/cake/{id}/edit` | Edit cake | Admin | Existing cake and optional images |
| `/admin/orders` | Admin orders | Admin | All bookings and status changes |
| `*` | Not found | Public | Unknown destination |

The current web project has no registered checkout route. Its cart checkout
action navigates to `/cake/checkout`, which currently displays the not-found
screen. Android should either open the buy screen for a selected cake or
implement a separate cart checkout flow before exposing a checkout button.

## 13. Frontend project structure

The web implementation is organized as follows:

```text
client/
  src/
    App.jsx                 Root routing, session state, back button
    CartContext.jsx         Local cart state and persistence
    config/api.js           API base URL
    middlewares/AdminRoute.jsx
    Pages/
      Home.jsx
      Cakes.jsx
      ShowNew.jsx           Cake detail page used by the app
      cakeBooking.jsx       Buy/payment screen
      Login.jsx
      Signup.jsx
      Navbar.jsx
      MyBookings.jsx
      AdminOrders.jsx
      AddCake.jsx
      EditCake.jsx
      Profile.jsx
      Cart.jsx
      Components/
        ReviewFromNew.jsx
        ReviewCard.jsx
    chatbot/
      services/chatApi.js
      hooks/useChat.js
      components/
```

The Android implementation should separate the same concerns:

- `ApiService`: Retrofit/HTTP declarations.
- `AuthInterceptor`: adds the JWT.
- `TokenStore`: encrypted token persistence.
- Repository classes: map API responses to UI state.
- ViewModels: loading, success, empty, and error states.
- Screens: render state and send validated user actions.
- Navigation: enforce authenticated/admin destinations.

Do not place API secrets, database credentials, Cloudinary secrets, or the
Razorpay secret in the Android project.

## 14. Frontend configuration

The web client reads:

```text
VITE_API_URL=https://bakeryapp-server.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_...
```

Android should use build-type configuration instead:

```text
debug API:   http://10.0.2.2:5000
release API: https://bakeryapp-server.onrender.com
```

The Razorpay key ID is public checkout configuration. The key secret is
server-only. Keep release and debug values separate and do not commit local
`.env` files or credentials.

## 15. Session and navigation details

At application startup:

1. Read the token from secure storage.
2. Read the cached user, if present.
3. Consider the user signed in only when a non-empty token exists.
4. Show authenticated navigation only after session state is loaded.
5. If a protected request returns `401`, clear both token and cached user.

When a user opens a protected action while logged out, preserve the intended
destination. For example, a buy action should return to the selected cake's
buy screen after successful login.

Admin access is determined by `user.role == "admin"` for UI navigation, but
the server remains the authority. The app must still handle `403` responses
because local cached user data can be stale or manipulated.

Logout must:

- Cancel or ignore in-flight authenticated screen updates.
- Remove `token` and `user`.
- Clear private in-memory data such as chat history and bookings.
- Navigate to the public home/login screen.

## 16. Exact local data contracts

The web cart stores a JSON array under the `cart` key. Each item has:

```json
{
  "id": "CAKE_OBJECT_ID",
  "name": "Chocolate Cake",
  "price": 850,
  "image": "https://...",
  "qty": 2
}
```

Android can use a local database or DataStore instead of localStorage. Preserve
these rules:

- Add an existing cake by increasing `qty`, not by duplicating it.
- New items start with `qty: 1`.
- Quantity must remain an integer of at least 1.
- Removing or setting quantity to 0 removes the item.
- Recalculate cart subtotal from numeric `price * qty`.
- Treat the server cake price as authoritative before payment.
- Remove stale items whose cake no longer exists or is unavailable.

Do not store full passwords or payment secrets in cart/session data.

## 17. Cake catalogue UI behavior

For `GET /api/cakes`:

- Display a loading state while the request is active.
- Display a retry action on network/API failure.
- Display an explicit empty state when `cakes` is empty.
- Render every image URL with a placeholder/fallback if an image fails.
- Format `price` as INR, but retain a numeric value for calculations.
- Show `ratings` and `totalReviews`; zero reviews should be rendered as zero,
  not as a missing value.
- Use `available` to disable buy/add-to-cart actions when false.

For cake details:

- Load cake and reviews independently where possible.
- Keep the cake ID in navigation arguments.
- Refresh the cake after review creation/deletion so rating counters update.
- Show edit/delete controls only for admins.
- Ask for confirmation before deletion.
- Remove the item from local catalog state only after a successful delete.

## 18. Add and edit cake form details

### Add cake form

Required controls:

- Cake name text field.
- Description multiline field.
- Price numeric/decimal field.
- Category fixed selection list.
- Image picker allowing 1 to 5 images.
- Weight fixed selection list.
- Flavor text field.
- Eggless switch/checkbox.
- Submit button with progress state.

Before submit:

1. Trim all text fields.
2. Reject blank required fields.
3. Parse price as a finite decimal and require `price >= 0`.
4. Require one through five images.
5. Check image MIME type against jpg/jpeg/png/webp/avif.
6. Optionally resize/compress large images for mobile upload.
7. Read the current token and reject an empty token before starting.

After success, clear the form and image picker, show the returned cake, and
refresh the catalogue. Do not manually construct Cloudinary URLs.

### Edit cake form

Pre-fill fields from `GET /api/cakes/{id}`. Existing images remain unless new
images are submitted. If new images are selected, explain to the admin that
they replace the complete image list. Apply the same field validation and
maximum-five image rule as add.

Disable submit while uploading. On failure, keep all entered values so the
admin can retry.

## 19. Booking form details

The buy screen first loads the selected cake and displays:

- Cake image/name/flavor/weight.
- Current unit price.
- Quantity stepper or numeric input.
- Delivery address.
- Indian phone number.
- Delivery date.
- Calculated total.
- Pay button.

Validation:

```text
quantity: integer >= 1
address: trim().isNotEmpty()
phone: ^[6-9]\d{9}$
deliveryDate: required and not before today
```

Use a date picker rather than free-form text. Recalculate total whenever
quantity changes, but reload the cake before payment to reduce stale-price
risk. Never allow a negative or fractional quantity.

While payment is active:

- Disable the pay button to prevent duplicate orders.
- Keep the delivery data in memory until verification finishes.
- Handle checkout dismissal separately from payment failure.
- Do not show “order placed” on Razorpay callback alone.
- Show success only after `/api/payment/verify` succeeds.

## 20. Review form details

Review controls:

- Rating selector from 1 to 5; do not accept zero.
- Required review text.
- Submit progress state.

Before POST:

- Require a signed-in user.
- Trim text.
- Require at least three characters.
- Disable duplicate submissions.

The server may return `403` when the user has not received the cake yet and
`400` when the user already reviewed it. Display the server message clearly.
After success, prepend the returned populated review and refresh cake rating
statistics.

## 21. Orders and admin order management

Customer order cards should show:

- Booking ID.
- Cake name/image.
- Quantity and total price.
- Delivery address/date.
- Payment status.
- Order status.
- Cancel action only while status is `Pending`.

Cancel only after confirmation. On successful cancellation, use the returned
booking and refresh the list. Hide/disable cancellation for all other states.

Admin order management requires:

- A refreshable list from `/api/bookings/all`.
- User name/email and cake details.
- Fixed status dropdown with only the server enum values.
- Progress indicator per update.
- Server-error message if an update fails.

Do not optimistically display a new status before the server confirms it.

## 22. Chat frontend details

Chat is authenticated and user-specific. The screen should:

- Load `/api/chat/history` when opened.
- Keep messages ordered oldest to newest.
- Render user and assistant messages differently.
- Reject blank messages after trimming.
- Disable send while a request is pending or queue messages deliberately.
- Show a typing indicator while waiting.
- Preserve the typed message if the request fails.
- Clear chat state on logout.

The server stores the user message before generating an answer. If the request
fails, the client must not pretend that the assistant answer was persisted.

## 23. Loading, empty, and error state checklist

Every API-backed screen should model at least:

```text
Idle -> Loading -> Success(data)
                 -> Empty
                 -> Error(message, retryable)
```

Avoid treating an empty list as a failed request. Avoid showing “No bookings”
before the first bookings request has completed. Keep retry buttons close to
the failed content. Log technical details only in debug builds; show users a
safe message without stack traces or tokens.

## 24. Android back button and lifecycle

The Capacitor web app handles the native back button by navigating browser
history when possible and exiting when there is no history. A native Android
implementation should use the navigation controller's back stack:

- Close an open modal or image gallery first.
- Navigate to the previous screen if one exists.
- Avoid exiting while a form has unsaved input without confirmation.
- Do not retry or update a destroyed screen after an async response.
- Cancel image uploads and payment callbacks when the screen is disposed.

## 25. API testing checklist

Test each endpoint with:

- No token.
- Malformed token.
- Expired token.
- Normal user token.
- Admin token.
- Invalid object ID.
- Missing required field.
- Empty string and whitespace.
- Boundary numeric values.
- Duplicate submit.
- Network timeout and offline mode.

For the frontend, verify:

- Login redirect returns to the original destination.
- Logout removes all private state.
- Admin screens are inaccessible to normal users.
- Five images succeed and six images are rejected.
- Cake update without images preserves images.
- Cake update with images replaces images.
- Review appears only after delivered purchase.
- Pending booking can be cancelled; other statuses cannot.
- Payment callback without successful verification does not create a success UI.
- App restart restores session/cart correctly.

## 26. Troubleshooting

### “No token, authorization denied”

Confirm that the token exists in secure storage and that the request header is
exactly `Authorization: Bearer <token>`. Ensure the token was read after login
completed and was not accidentally stored with quotes or a second `Bearer`.

### “Access denied” while adding/editing/deleting

The authenticated account must have `role: "admin"`. A locally edited role
does not grant permission; the server checks the database user.

### Image upload fails

Use multipart, use the field name `images` for every file, send no manually
constructed multipart boundary, and use one of the supported formats. Check
Cloudinary server configuration and network connectivity.

### CORS works in browser but not native Android

Native Android requests usually do not use browser CORS enforcement. Check the
base URL, cleartext policy for local HTTP, emulator address (`10.0.2.2`), and
the `INTERNET` permission.

### Payment succeeds but no booking appears

Check the verify request, JWT, exact Razorpay IDs/signature, cake ID, and
delivery fields. Refresh `/api/bookings/my` only after verify returns success.
Never retry payment verification blindly without preserving the original
Razorpay values.

### API returns 500

Show a retryable error and capture the server `message` in debug logs. Common
causes are MongoDB, Cloudinary, Razorpay, or AI provider configuration rather
than an Android rendering problem.

## 27. Recommended implementation order

1. Configure release/debug base URLs and Android Internet access.
2. Implement response/error parsing and the auth interceptor.
3. Implement login/signup/logout and secure token storage.
4. Implement catalogue and cake detail screens.
5. Implement local cart persistence and quantity rules.
6. Implement booking validation and Razorpay checkout.
7. Implement payment verification and order history.
8. Implement reviews and delivered-order gating.
9. Implement admin cake CRUD and image upload.
10. Implement admin order status management.
11. Implement authenticated chatbot/history.
12. Add lifecycle, retry, offline, and end-to-end tests.
