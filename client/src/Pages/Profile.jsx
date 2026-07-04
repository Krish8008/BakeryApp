import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Login Required
        </h1>

        <p className="mt-3 text-gray-600">
          Please login to access this page.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold text-pink-600 mb-8">
        My Profile
      </h1>

      <div className="space-y-5">

        <div>
          <label className="font-semibold">
            Name
          </label>

          <p>{user.name}</p>
        </div>

        <div>
          <label className="font-semibold">
            Email
          </label>

          <p>{user.email}</p>
        </div>

        <div>
          <label className="font-semibold">
            Role
          </label>

          <p>{user.role}</p>
        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-pink-600 text-white px-6 py-3 rounded"
        >
          My Orders
        </button>

        {user.role === "admin" && (
          <button
            onClick={() =>
              navigate("/admin/orders")
            }
            className="bg-gray-800 text-white px-6 py-3 rounded"
          >
            Admin Panel
          </button>
        )}

      </div>

    </div>
  );
}

export default Profile;