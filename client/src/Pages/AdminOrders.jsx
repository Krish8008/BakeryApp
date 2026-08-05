import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/bookings/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setOrders(res.data.bookings);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated successfully");

      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl">
          No Orders Found
        </h2>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border"
            >
              <img
                src={order.cake?.images?.[0]}
                alt={order.cake?.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold mb-3">
                  {order.cake?.name}
                </h2>

                <hr className="mb-4" />

                <p>
                  <strong>Customer :</strong>{" "}
                  {order.user?.name}
                </p>

                <p>
                  <strong>Email :</strong>{" "}
                  {order.user?.email}
                </p>

                <p>
                  <strong>Phone :</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Address :</strong>{" "}
                  {order.deliveryAddress}
                </p>

                <p>
                  <strong>Quantity :</strong>{" "}
                  {order.quantity}
                </p>

                <p>
                  <strong>Total :</strong> ₹
                  {order.totalPrice}
                </p>

                <p>
                  <strong>Delivery :</strong>{" "}
                  {new Date(
                    order.deliveryDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Payment :</strong>{" "}
                  {order.paymentStatus}
                </p>

                <div className="mt-4">

                  <label className="font-bold">
                    Order Status
                  </label>

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="w-full border mt-2 p-2 rounded"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Preparing">
                      Preparing
                    </option>

                    <option value="Out For Delivery">
                      Out For Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default AdminOrders;