import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '../../config/api';

export default function ReviewForm({ productId, currentUser, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!currentUser || !token) {
      toast.error('Please login to leave a review.');
      return;
    }

    if (!rating || !reviewText.trim()) {
      toast.error('Please select a rating and write your review.');
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
        toast.success('Thank you for your review!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit review.');
    }
  };

  if (!currentUser) {
    return (
      <div className="mt-4 rounded-2xl border border-pink-100 bg-pink-50 p-4 text-sm text-pink-700">
        Please login to share your review.
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Thank you for your review.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Share your experience</h4>
            <p className="text-[11px] text-slate-400">Tell others how the cake tasted and looked.</p>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transform transition-transform active:scale-95 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <svg
                  className={`h-6 w-6 transition-colors duration-150 ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-none text-slate-200'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.326.504-.543.89-.543s.739.217.89.543l2.254 4.88 5.163.61c.365.043.67.28.803.623.132.342.053.729-.21 1.002l-3.86 4.015.912 5.37c.063.37-.091.737-.412.96-.32.222-.736.222-1.056.002L12 18.175l-4.764 2.802c-.32.189-.736.189-1.056-.002-.32-.223-.475-.59-.412-.96l.912-5.37-3.86-4.015c-.263-.273-.342-.66-.21-1.002.133-.343.438-.58.803-.623l5.163-.61 2.254-4.88z" />
                </svg>
              </button>
            ))}
            <span className="ml-1 text-xs font-semibold text-amber-500">({rating}/5)</span>
          </div>
        </div>

        <div className="w-full">
          <textarea
            rows="3"
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-pink-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Write your review about this cake..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
