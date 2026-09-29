import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  CreditCard,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import { API_URL } from "../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/bookings/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setOrders(res.data.bookings);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
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

      toast.error(
        error.response?.data?.message || "Unable to update status"
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#fff4df] text-[#9a641c]";

      case "Accepted":
        return "bg-[#f1e8ff] text-[#7041a5]";

      case "Preparing":
        return "bg-[#fff0e8] text-[#b45d45]";

      case "Out For Delivery":
        return "bg-[#e9f3ff] text-[#35658f]";

      case "Delivered":
        return "bg-[#e8f6ed] text-[#34734c]";

      case "Cancelled":
        return "bg-[#fceaea] text-[#a33e3e]";

      default:
        return "bg-[#f5f0ed] text-[#765f58]";
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] text-[#38231f] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b45d45]">
              Bakery Dashboard
            </p>

            <h1 className="font-serif text-4xl font-bold text-[#38231f] sm:text-5xl">
              Manage Orders
            </h1>

            <p className="mt-3 max-w-xl text-[#765f58]">
              Review customer orders, payment details, delivery information,
              and keep every order moving smoothly.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#eadbd1] bg-white px-5 py-3 text-sm font-semibold text-[#773d33] shadow-sm transition hover:bg-[#fff4ed] disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Orders
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8d6af] text-[#773d33]">
                <ShoppingBag size={22} />
              </div>

              <div>
                <p className="text-sm text-[#765f58]">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-[#38231f]">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#b45d45]">
                <Package size={22} />
              </div>

              <div>
                <p className="text-sm text-[#765f58]">
                  Active Orders
                </p>

                <p className="text-2xl font-bold text-[#38231f]">
                  {
                    orders.filter(
                      (order) =>
                        !["Delivered", "Cancelled"].includes(
                          order.orderStatus
                        )
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f6ed] text-[#34734c]">
                <CreditCard size={22} />
              </div>

              <div>
                <p className="text-sm text-[#765f58]">
                  Paid Orders
                </p>

                <p className="text-2xl font-bold text-[#38231f]">
                  {
                    orders.filter(
                      (order) => order.paymentStatus === "Paid"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Empty State */}
        {orders.length === 0 && !loading ? (
          <div className="rounded-3xl border border-[#eadbd1] bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8d6af] text-[#773d33]">
              <Package size={30} />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#38231f]">
              No Orders Found
            </h2>

            <p className="mt-2 text-[#765f58]">
              New customer orders will appear here.
            </p>
          </div>
        ) : (

          /* Orders */
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]">

            {orders.map((order) => (
              <div
                key={order._id}
                className="w-[min(82vw,320px)] flex-none snap-start overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Cake Image */}
                <div className="relative">
                  <img
                    src={order.cake?.images?.[0]}
                    alt={order.cake?.name || "Cake"}
                    className="h-40 w-full object-cover"
                  />

                  <div className="absolute right-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">

                  {/* Cake Name */}
                  <div className="mb-5 flex items-start justify-between gap-3">

                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#b45d45]">
                        Cake Order
                      </p>

                      <h2 className="font-serif text-xl font-bold text-[#38231f]">
                        {order.cake?.name}
                      </h2>
                    </div>

                    <span className="whitespace-nowrap rounded-full bg-[#fff4ed] px-3 py-1 text-xs font-semibold text-[#9b4d39]">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </div>

                  {/* Customer Details */}
                  <div className="mb-4 rounded-2xl bg-[#fffaf7] p-3">

                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#765f58]">
                      Customer Details
                    </p>

                    <div className="space-y-3 text-sm">

                      <div className="flex items-center gap-3">
                        <User
                          size={16}
                          className="text-[#b45d45]"
                        />

                        <span className="font-medium text-[#38231f]">
                          {order.user?.name || "Customer"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail
                          size={16}
                          className="text-[#b45d45]"
                        />

                        <span className="truncate text-[#765f58]">
                          {order.user?.email || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone
                          size={16}
                          className="text-[#b45d45]"
                        />

                        <span className="text-[#765f58]">
                          {order.phone || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-[#b45d45]"
                        />

                        <span className="line-clamp-2 text-[#765f58]">
                          {order.deliveryAddress || "N/A"}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="grid grid-cols-2 gap-3 border-y border-[#eadbd1] py-4">

                    <div>
                      <p className="text-xs text-[#765f58]">
                        Quantity
                      </p>

                      <p className="mt-1 font-semibold text-[#38231f]">
                        {order.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#765f58]">
                        Total
                      </p>

                      <p className="mt-1 font-semibold text-[#9b4d39]">
                        ₹{order.totalPrice}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#765f58]">
                        Delivery
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="text-[#b45d45]"
                        />

                        <p className="font-semibold text-[#38231f]">
                          {new Date(
                            order.deliveryDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-[#765f58]">
                        Payment
                      </p>

                      <p
                        className={`mt-1 font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "text-[#34734c]"
                            : "text-[#9a641c]"
                        }`}
                      >
                        {order.paymentStatus}
                      </p>
                    </div>

                  </div>

                  {/* Status */}
                  <div className="mt-4">

                    <label className="text-xs font-bold uppercase tracking-wider text-[#765f58]">
                      Update Order Status
                    </label>

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 font-semibold text-[#773d33] outline-none transition focus:border-[#b45d45] focus:ring-2 focus:ring-[#f8d6af]"
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