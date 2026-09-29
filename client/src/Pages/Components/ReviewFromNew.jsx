import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Check, Star } from "lucide-react";

import { API_URL } from "../../config/api";

export default function ReviewForm({
  productId,
  currentUser,
  onReviewAdded,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!currentUser || !token) {
      toast.error("Please login to leave a review.");
      return;
    }

    if (!rating || !reviewText.trim()) {
      toast.error("Please select a rating and write your review.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/cakes/${productId}/reviews`,
        {
          rating,
          review: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsSubmitted(true);
        onReviewAdded?.(response.data.review);

        toast.success("Thank you for your review!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to submit review."
      );
    }
  };

  // =========================
  // LOGIN REQUIRED
  // =========================
  if (!currentUser) {
    return (
      <div className="rounded-2xl border border-[#eadbd1] bg-[#fffaf7] p-5">
        <p className="text-sm font-semibold text-[#38231f]">
          Login to share your review
        </p>

        <p className="mt-1 text-xs leading-5 text-[#765f58]">
          Sign in to tell others about your experience with this cake.
        </p>
      </div>
    );
  }

  // =========================
  // SUCCESS
  // =========================
  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-[#dce9dc] bg-[#f5faf5] p-5 text-center">
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#e3f0e3] text-[#4d7650]">
          <Check size={17} />
        </div>

        <p className="mt-2 text-sm font-semibold text-[#385c3c]">
          Thank you for your review.
        </p>

        <p className="mt-1 text-xs text-[#6d806f]">
          Your feedback has been added successfully.
        </p>
      </div>
    );
  }

  // =========================
  // FORM
  // =========================
  return (
    <div className="rounded-2xl border border-[#eadbd1] bg-white p-5 shadow-sm">

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* HEADER */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b45d45]">
            Your Experience
          </p>

          <h4 className="mt-1 font-serif text-xl font-semibold text-[#38231f]">
            Share your review
          </h4>

          <p className="mt-1 text-xs leading-5 text-[#765f58]">
            Tell others how the cake tasted and looked.
          </p>
        </div>

        {/* RATING */}
        <div>
          <p className="mb-2 text-xs font-semibold text-[#765f58]">
            Your Rating
          </p>

          <div className="flex items-center gap-1">

            {[1, 2, 3, 4, 5].map((star) => {
              const active =
                star <= (hoverRating || rating);

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded-md p-0.5 transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} out of 5`}
                >
                  <Star
                    size={21}
                    strokeWidth={1.7}
                    className={
                      active
                        ? "fill-[#f8c978] text-[#c98a3d]"
                        : "text-[#d9c9c1]"
                    }
                  />
                </button>
              );
            })}

            <span className="ml-2 text-xs font-semibold text-[#9b4d39]">
              {rating}/5
            </span>

          </div>
        </div>

        {/* REVIEW */}
        <div>
          <label
            htmlFor="review"
            className="mb-2 block text-xs font-semibold text-[#765f58]"
          >
            Your Review
          </label>

          <textarea
            id="review"
            rows="4"
            className="w-full resize-none rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-3 py-2.5 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
            placeholder="Write your review about this cake..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full rounded-full bg-[#4c2626] px-4 py-3 text-xs font-bold text-[#fffaf7] transition hover:bg-[#683533] focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2"
        >
          Submit Review
        </button>

      </form>
    </div>
  );
}