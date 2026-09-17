import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    fetchOrders();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
              Bakery dashboard
            </p>
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Manage Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review customer details and keep every delivery moving.
            </p>
          </div>
          <div className="w-fit rounded-2xl bg-white px-5 py-3 text-center shadow-sm ring-1 ring-pink-100">
            <p className="text-2xl font-bold text-pink-600">{orders.length}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-pink-100">
            <h2 className="text-2xl font-semibold text-slate-700">No orders found</h2>
            <p className="mt-2 text-slate-500">New customer orders will appear here.</p>
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:thin]">

          {orders.map((order) => (
            <div
              key={order._id}
              className="w-[min(88vw,380px)] flex-none snap-start overflow-hidden rounded-3xl bg-white shadow-lg shadow-pink-100/60 ring-1 ring-pink-100 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={order.cake?.images?.[0]}
                alt={order.cake?.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-slate-800">{order.cake?.name}</h2>
                  <span className="whitespace-nowrap rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 border-y border-slate-100 py-4 text-sm text-slate-600">
                  <p><strong className="text-slate-800">Customer:</strong> {order.user?.name}</p>
                  <p className="truncate"><strong className="text-slate-800">Email:</strong> {order.user?.email}</p>
                  <p><strong className="text-slate-800">Phone:</strong> {order.phone}</p>
                  <p className="line-clamp-2"><strong className="text-slate-800">Address:</strong> {order.deliveryAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-4 text-sm">
                  <div><p className="text-slate-500">Quantity</p><p className="font-semibold text-slate-800">{order.quantity}</p></div>
                  <div><p className="text-slate-500">Total</p><p className="font-semibold text-pink-600">₹{order.totalPrice}</p></div>
                  <div><p className="text-slate-500">Delivery</p><p className="font-semibold text-slate-800">{new Date(order.deliveryDate).toLocaleDateString()}</p></div>
                  <div><p className="text-slate-500">Payment</p><p className="font-semibold text-slate-800">{order.paymentStatus}</p></div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Order status</label>

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2.5 font-semibold text-pink-700 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
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

    </div>
  );
};

export default AdminOrders;
