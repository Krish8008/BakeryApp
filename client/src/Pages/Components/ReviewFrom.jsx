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
  // Login Required
  // =========================

  if (!currentUser) {
    return (
      <div className="mt-4 rounded-2xl border border-[#eadbd1] bg-[#fffaf7] p-4">
        <p className="text-sm font-medium text-[#765f58]">
          Please login to share your review.
        </p>
      </div>
    );
  }

  // =========================
  // Review Submitted
  // =========================

  if (isSubmitted) {
    return (
      <div className="mt-4 rounded-2xl border border-[#cfe5d6] bg-[#f1faf3] p-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-[#34734c]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dcefe1]">
            <Check size={14} />
          </span>

          Thank you for your review.
        </p>
      </div>
    );
  }

  // =========================
  // Review Form
  // =========================

  return (
    <div className="mt-4 w-full rounded-2xl border border-[#eadbd1] bg-white p-4 shadow-sm">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Header + Rating */}

        <div className="flex flex-col gap-3">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b45d45]">
              Delivered successfully
            </p>

            <h4 className="mt-1 font-serif text-lg font-bold text-[#38231f]">
              Share your experience
            </h4>

            <p className="mt-1 text-xs text-[#8a7168]">
              Tell others how the cake tasted and looked.
            </p>
          </div>

          {/* Rating */}

          <div className="flex items-center">

            <div className="flex items-center gap-0.5">

              {[1, 2, 3, 4, 5].map((star) => {

                const active =
                  star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} out of 5`}
                    className="rounded-lg p-0.5 transition-transform active:scale-90 focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onMouseLeave={() =>
                      setHoverRating(0)
                    }
                  >
                    <Star
                      size={22}
                      strokeWidth={1.7}
                      className={
                        active
                          ? "fill-[#d99a3d] text-[#d99a3d]"
                          : "text-[#d9cbc3]"
                      }
                    />
                  </button>
                );
              })}

            </div>

            <span className="ml-2 rounded-full bg-[#fff4df] px-2.5 py-1 text-xs font-semibold text-[#9a641c]">
              {rating}/5
            </span>

          </div>

        </div>

        {/* Review Text */}

        <div>

          <textarea
            rows="3"
            className="w-full resize-none rounded-xl border border-[#eadbd1] bg-[#fffaf7] p-3 text-sm text-[#38231f] placeholder:text-[#a28c84] outline-none transition focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
            placeholder="Write your review about this cake..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
          />

          <p className="mt-1.5 text-right text-[11px] text-[#a28c84]">
            Your feedback helps other customers.
          </p>

        </div>

        {/* Submit */}

        <button
          type="submit"
          className="w-full rounded-xl bg-[#9b4d39] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#773d33] focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2"
        >
          Submit Review
        </button>

      </form>

    </div>
  );
}