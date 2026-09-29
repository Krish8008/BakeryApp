import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CalendarDays,
  CreditCard,
  Package,
  ShoppingBag,
  XCircle,
  RefreshCw,
  MessageSquareText,
  ChevronRight,
} from "lucide-react";

import { API_URL } from "../config/api";
import ReviewForm from "./Components/ReviewFrom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Review popup
  const [selectedBooking, setSelectedBooking] = useState(null);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  async function fetchBookings(showRefresh = false) {
    try {
      if (showRefresh) setRefreshing(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load your orders."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking cancelled successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to cancel this order."
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

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf7] px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 h-8 w-40 rounded bg-[#eadbd1]" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 rounded-2xl bg-[#f3e9e3]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffaf7] px-4 py-12">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8d6af] text-[#9b4d39]">
            <ShoppingBag size={25} />
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#38231f]">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-[#765f58]">
            Your cake orders will appear here.
          </p>

        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">

            <div>
              <h1 className="font-serif text-2xl font-bold text-[#38231f]">
                My Bookings
              </h1>

              <p className="mt-1 text-sm text-[#765f58]">
                {bookings.length} order
                {bookings.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() => fetchBookings(true)}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-lg border border-[#eadbd1] bg-white px-3 py-2 text-sm text-[#765f58] transition hover:border-[#b45d45] hover:text-[#9b4d39]"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

          </div>

          {/* Booking Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-[#eadbd1] bg-white shadow-sm transition hover:shadow-md"
              >

                {/* Image */}
                <div className="relative">

                  <img
                    src={
                      booking.cake?.images?.[0] ||
                      "/no-image.png"
                    }
                    alt={
                      booking.cake?.name ||
                      "Ordered cake"
                    }
                    className="h-32 w-full object-cover"
                  />

                  <div className="absolute right-2 top-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${getStatusStyle(
                        booking.orderStatus
                      )}`}
                    >
                      {booking.orderStatus}
                    </span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-3">

                  {/* Cake */}
                  <div className="mb-3">
                    <h2 className="truncate text-base font-bold text-[#38231f]">
                      {booking.cake?.name || "Cake Order"}
                    </h2>

                    <p className="mt-0.5 text-xs text-[#8a7168]">
                      Order #{booking._id?.slice(-6)}
                    </p>
                  </div>

                  {/* Small details */}
                  <div className="grid grid-cols-2 gap-2">

                    <div className="rounded-lg bg-[#fffaf7] p-2">
                      <div className="flex items-center gap-1.5">
                        <Package
                          size={13}
                          className="text-[#b45d45]"
                        />

                        <span className="text-[10px] text-[#8a7168]">
                          Quantity
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-[#38231f]">
                        {booking.quantity || 1}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#fffaf7] p-2">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag
                          size={13}
                          className="text-[#b45d45]"
                        />

                        <span className="text-[10px] text-[#8a7168]">
                          Total
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-[#38231f]">
                        ₹{booking.totalAmount}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#fffaf7] p-2">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays
                          size={13}
                          className="text-[#b45d45]"
                        />

                        <span className="text-[10px] text-[#8a7168]">
                          Delivery
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-[#38231f]">
                        {booking.deliveryDate
                          ? new Date(
                              booking.deliveryDate
                            ).toLocaleDateString()
                          : "Not set"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#fffaf7] p-2">
                      <div className="flex items-center gap-1.5">
                        <CreditCard
                          size={13}
                          className="text-[#b45d45]"
                        />

                        <span className="text-[10px] text-[#8a7168]">
                          Payment
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-[#38231f]">
                        {booking.paymentStatus || "Pending"}
                      </p>
                    </div>

                  </div>

                  {/* Bottom actions */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#eadbd1] pt-3">

                    {/* View details */}
                    <button
                      className="flex items-center gap-1 text-xs font-semibold text-[#9b4d39] hover:text-[#773d33]"
                    >
                      View details
                      <ChevronRight size={13} />
                    </button>

                    {/* Delivered → Review */}
                    {booking.orderStatus === "Delivered" && (
                      <button
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="flex items-center gap-1.5 rounded-lg bg-[#9b4d39] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#773d33]"
                      >
                        <MessageSquareText size={13} />
                        Give Review
                      </button>
                    )}

                    {/* Pending → Cancel */}
                    {booking.orderStatus === "Pending" && (
                      <button
                        onClick={() =>
                          cancelBooking(booking._id)
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-[#f0caca] px-3 py-1.5 text-xs font-semibold text-[#a33e3e] transition hover:bg-[#fceaea]"
                      >
                        <XCircle size={13} />
                        Cancel
                      </button>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
          onClick={() => setSelectedBooking(null)}
        >

          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#eadbd1] px-5 py-4">

              <div>
                <h3 className="font-serif text-lg font-bold text-[#38231f]">
                  Give a Review
                </h3>

                <p className="mt-0.5 text-xs text-[#8a7168]">
                  {selectedBooking.cake?.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#765f58] transition hover:bg-[#fffaf7] hover:text-[#38231f]"
              >
                ✕
              </button>

            </div>

            {/* Review Form */}
            <div className="p-5">

              <ReviewForm
                productId={selectedBooking.cake?._id}
                currentUser={currentUser}
                onReviewAdded={() => {
                  setSelectedBooking(null);
                  toast.success("Review submitted successfully!");
                }}
              />

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;