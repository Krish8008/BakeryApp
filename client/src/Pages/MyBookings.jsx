import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookings(res.data.bookings);

    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled");

      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  if (bookings.length === 0) {
    return (
      <h2 className="text-center mt-10 text-2xl">
        No Bookings Found
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="shadow-lg rounded-lg p-4 border"
          >

            <img
              src={booking.cake.images[0]}
              alt={booking.cake.name}
              className="w-full h-56 object-cover rounded"
            />

            <h2 className="text-2xl font-bold mt-3">
              {booking.cake.name}
            </h2>

            <p>
              Quantity : {booking.quantity}
            </p>

            <p>
              Total Price : ₹{booking.totalPrice}
            </p>

            <p>
              Delivery :
              {" "}
              {new Date(booking.deliveryDate).toLocaleDateString()}
            </p>

            <p>
              Payment :
              {" "}
              {booking.paymentStatus}
            </p>

            <p>
              Status :
              {" "}
              <span className="font-bold">
                {booking.orderStatus}
              </span>
            </p>

            {booking.orderStatus === "Pending" && (

              <button
                onClick={() => cancelBooking(booking._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel Booking
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyBookings;