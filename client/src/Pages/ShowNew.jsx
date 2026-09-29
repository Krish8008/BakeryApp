import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CakeSlice,
  Check,
  Pencil,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { API_URL } from "../config/api";
import ReviewCard from "./Components/ReviewCard";
import ReviewForm from "./Components/ReviewFromNew";
import { useCart } from "../CartContext";

function ShowCake() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cake, setCake] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

  const { addItem } = useCart();

  // =========================
  // FETCH CAKE
  // =========================
  const fetchCake = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/cakes/${id}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to load cake");
        return;
      }

      setCake(data.cake);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cake");
    }
  }, [id]);

  // =========================
  // FETCH REVIEWS
  // =========================
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/cakes/${id}/reviews`);
      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchCake();
    fetchReviews();
  }, [fetchCake, fetchReviews]);

  // =========================
  // DELETE CAKE
  // =========================
  const handleDelete = async () => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can delete cakes.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cake?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/cakes/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Cake deleted successfully!");
        navigate("/cakes");
      } else {
        toast.error(data.message || "Unable to delete cake");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // =========================
  // BUY
  // =========================
  const handleBuy = () => {
    if (!token) {
      toast.error("Please login first.");

      navigate("/login", {
        state: {
          from: `/cake/${id}/buy`,
        },
      });

      return;
    }

    navigate(`/cake/${id}/buy`);
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addItem(cake, 1);
    toast.success("Added to cart");
  };

  // =========================
  // REVIEW
  // =========================
  const handleReviewDeleted = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review._id !== reviewId));
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // =========================
  // LOADING
  // =========================

    useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  
  if (!cake) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f8d6af] text-[#4c2626]">
            <CakeSlice size={22} />
          </div>

          <h2 className="mt-4 font-serif text-2xl font-semibold text-[#38231f]">
            Loading cake...
          </h2>

          <p className="mt-1 text-sm text-[#765f58]">
            Preparing something sweet for you.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">

      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">

        {/* BACK */}
        <button
          onClick={() => navigate("/cakes")}
          className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#765f58] transition hover:text-[#9b4d39]"
        >
          <ArrowLeft size={15} />
          Back to collection
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">

          {/* =================================================
              IMAGE SECTION
          ================================================= */}
          <div>
            <div className="relative overflow-hidden rounded-2xl bg-[#f5e9df]">

              <img
                src={cake.images?.[selectedImage] || "/no-image.png"}
                alt={cake.name}
                className="h-[320px] w-full object-cover md:h-[400px]"
              />

              {/* CATEGORY */}
              <div className="absolute left-3 top-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4c2626]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f8d6af] backdrop-blur">
                  <CakeSlice size={12} />
                  {cake.category}
                </span>
              </div>

              {/* EGGLESS BADGE */}
              {cake.eggless && (
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#fffaf7] px-3 py-1.5 text-[11px] font-semibold text-[#4d7650] shadow-sm">
                  <Check size={13} />
                  Eggless
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            {cake.images?.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {cake.images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === index
                        ? "border-[#9b4d39]"
                        : "border-[#eadbd1]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${cake.name} ${index + 1}`}
                      className="h-16 w-16 object-cover md:h-20 md:w-20"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              DETAILS SECTION
          ================================================= */}
          <div className="flex flex-col justify-center">

            {/* BRAND LABEL */}
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45d45]">
              CakeCraft Patisserie
            </p>

            {/* TITLE */}
            <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#38231f] md:text-4xl">
              {cake.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#765f58]">
              {cake.description}
            </p>

            {/* PRICE */}
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a7168]">
                Price
              </p>

              <p className="mt-0.5 font-serif text-3xl font-semibold text-[#9b4d39]">
                ₹{cake.price}
              </p>
            </div>

            {/* WEIGHT + FLAVOR */}
            <div className="mt-5 grid max-w-lg grid-cols-2 gap-2">

              <div className="rounded-xl border border-[#eadbd1] bg-white px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#b45d45]">
                  Weight
                </p>

                <p className="mt-1 text-sm font-semibold text-[#38231f]">
                  {cake.weight}
                </p>
              </div>

              <div className="rounded-xl border border-[#eadbd1] bg-white px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#b45d45]">
                  Flavor
                </p>

                <p className="mt-1 text-sm font-semibold text-[#38231f]">
                  {cake.flavor}
                </p>
              </div>

            </div>

            {/* EGGLESS */}
            {cake.eggless && (
              <div className="mt-3 flex max-w-lg items-center gap-2 rounded-xl border border-[#dce9dc] bg-[#f5faf5] px-3 py-2.5">
                <Check
                  size={15}
                  className="text-[#4d7650]"
                />

                <p className="text-xs font-semibold text-[#385c3c]">
                  Eggless cake
                </p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="mt-5 flex gap-2">

              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full border border-[#9b4d39] bg-white px-4 py-3 text-xs font-bold text-[#9b4d39] transition hover:bg-[#fff1e5]"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuy}
                className="flex-1 rounded-full bg-[#4c2626] px-4 py-3 text-xs font-bold text-[#fffaf7] transition hover:bg-[#683533]"
              >
                Buy Now
              </button>

            </div>

            {/* ADMIN ACTIONS */}
            {isAdmin && (
              <div className="mt-2 flex gap-2">

                <button
                  onClick={() => navigate(`/cake/${id}/edit`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#eadbd1] bg-white px-4 py-2.5 text-xs font-semibold text-[#765f58] transition hover:border-[#b45d45] hover:text-[#9b4d39]"
                >
                  <Pencil size={13} />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#ead5d1] bg-white px-4 py-2.5 text-xs font-semibold text-[#a64b43] transition hover:bg-[#fff0ee]"
                >
                  <Trash2 size={13} />
                  Delete
                </button>

              </div>
            )}

            {/* SMALL FEATURES */}
            <div className="mt-6 border-t border-[#eadbd1] pt-4">
              <div className="grid grid-cols-3 gap-2">

                <div className="text-center">
                  <Truck
                    size={16}
                    className="mx-auto text-[#b45d45]"
                  />

                  <p className="mt-1 text-[10px] font-medium text-[#765f58]">
                    Fast Delivery
                  </p>
                </div>

                <div className="text-center">
                  <CakeSlice
                    size={16}
                    className="mx-auto text-[#b45d45]"
                  />

                  <p className="mt-1 text-[10px] font-medium text-[#765f58]">
                    Freshly Baked
                  </p>
                </div>

                <div className="text-center">
                  <Sparkles
                    size={16}
                    className="mx-auto text-[#b45d45]"
                  />

                  <p className="mt-1 text-[10px] font-medium text-[#765f58]">
                    Premium Quality
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}
      <section className="border-t border-[#eadbd1] bg-white px-4 py-8 md:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b45d45]">
              Customer Feedback
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#38231f]">
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-[#765f58]">
              See what customers think about this cake.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_.8fr]">

            {/* REVIEWS LIST */}
            <div>

              {reviews.length === 0 ? (
                <div className="rounded-2xl border border-[#eadbd1] bg-[#fffaf7] px-5 py-8 text-center">
                  <CakeSlice
                    size={24}
                    className="mx-auto text-[#b45d45]"
                  />

                  <p className="mt-3 text-sm font-semibold text-[#38231f]">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-xs text-[#765f58]">
                    Be the first customer to share your experience.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <ReviewCard
                      key={rev._id}
                      review={rev}
                      currentUser={user}
                      onDelete={async (reviewId) => {
                        try {
                          const res = await fetch(
                            `${API_URL}/api/cakes/${id}/reviews/${reviewId}`,
                            {
                              method: "DELETE",
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          const data = await res.json();

                          if (data.success) {
                            toast.success("Review deleted");
                            handleReviewDeleted(reviewId);
                          } else {
                            toast.error(
                              data.message || "Unable to delete"
                            );
                          }
                        } catch (error) {
                          console.error(error);
                          toast.error("Unable to delete review");
                        }
                      }}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* REVIEW FORM */}
            <div>
              <ReviewForm
                productId={id}
                currentUser={user}
                onReviewAdded={handleReviewAdded}
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="px-4 py-8 md:px-6">

        <div className="mx-auto max-w-6xl rounded-2xl bg-[#4c2626] px-5 py-8 text-center text-[#fffaf7]">

          <Sparkles
            size={18}
            className="mx-auto text-[#f8d6af]"
          />

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#f8d6af]">
            CakeCraft Patisserie
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold">
            Every celebration deserves something memorable.
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-[#f9e8d9]/70">
            From the first idea to the final slice, we put care into every
            cake we create.
          </p>

          <button
            onClick={() => navigate("/cakes")}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f8d6af] px-5 py-2.5 text-xs font-bold text-[#4c2626] transition hover:bg-white"
          >
            Explore the collection
            <ArrowLeft
              size={13}
              className="rotate-180"
            />
          </button>

        </div>

      </section>

    </main>
  );
}

export default ShowCake;