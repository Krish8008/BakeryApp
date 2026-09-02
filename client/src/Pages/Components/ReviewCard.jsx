import React from 'react';

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function ReviewCard({ review, currentUser, onDelete }) {
  const reviewerName = review?.user?.name || 'Customer';
  const reviewDate = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Recently';

  const isOwner =
    currentUser &&
    review?.user &&
    (review.user._id?.toString?.() === currentUser.id || review.user.id?.toString?.() === currentUser.id);

  const canDelete = Boolean(currentUser && (currentUser.role === 'admin' || isOwner));

  return (
    <div className="w-full rounded-2xl border border-pink-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-100"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reviewerName)}&background=FBCFE8&color=831843&size=128`}
            alt={reviewerName}
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-800">{reviewerName}</h4>
              {review?.user?.role === 'admin' && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">Reviewed on {reviewDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StarRating rating={review?.rating || 0} />
          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete?.(review?._id)}
              className="rounded-full border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm leading-relaxed text-slate-600">{review?.review || 'No review provided.'}</p>
      </div>
    </div>
  );
}
