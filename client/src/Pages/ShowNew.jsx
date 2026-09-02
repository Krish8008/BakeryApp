import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { API_URL } from "../config/api";
import ReviewCard from "./Components/ReviewCard";
import ReviewForm from "./Components/ReviewFromNew";
import { useCart } from "../CartContext";
import "./ShowNew.css";

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

  const fetchCake = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cakes/${id}`);
      const data = await response.json();
      setCake(data.cake);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cakes/${id}/reviews`);
      const data = await res.json();
      if (data.success) setReviews(data.reviews || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCake();
    fetchReviews();
  }, [id]);

  const handleDelete = async () => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can delete cakes.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this cake?");

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
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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

  const handleAddToCart = () => {
    addItem(cake, 1);
    toast.success("Added to cart");
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (!cake) {
    return (
      <div className="sn-loading">
        <h2 className="sn-loading-text">Loading Cake...</h2>
      </div>
    );
  }

  return (
    <div className="sn-page">
      <div className="sn-card">
        <div className="sn-grid">
          <div>
            <div className="sn-image-wrap">
              <img
                src={cake.images?.[selectedImage] || "/no-image.png"}
                alt={cake.name}
                className="sn-main-img"
              />
            </div>

            <div className="sn-thumbs">
              {cake.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={cake.name}
                  onClick={() => setSelectedImage(index)}
                  className={`sn-thumb ${
                    selectedImage === index ? "sn-thumb-selected" : "sn-thumb-unselected"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="sn-details">
            <span className="sn-category">
              {cake.category}
            </span>

            <h1 className="sn-title">{cake.name}</h1>

            <p className="sn-desc">{cake.description}</p>

            <h2 className="sn-price">₹{cake.price}</h2>

            <div className="sn-info-grid">
              <div className="sn-info-box">
                <p className="sn-info-label">Weight</p>
                <h3 className="sn-info-value">{cake.weight}</h3>
              </div>

              <div className="sn-info-box">
                <p className="sn-info-label">Flavor</p>
                <h3 className="sn-info-value">{cake.flavor}</h3>
              </div>
            </div>

            {cake.eggless && (
              <div className="mt-6">
                <span className="sn-eggless">✅ Eggless Cake</span>
              </div>
            )}

            <div className="sn-actions">
              <button onClick={handleAddToCart} className="btn-primary">
                Add to Cart
              </button>

              <button
                onClick={handleBuy}
                className="btn-outline"
              >
                Buy Now
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => navigate(`/cake/${id}/edit`)}
                    className="btn-edit"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <div className="sn-features">
              <div className="flex justify-between text-sm text-gray-500">
                <span>🚚 Fast Delivery</span>
                <span>🥮 Freshly Baked</span>
                <span>✨ Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="sn-reviews-wrap">
          <div className="sn-reviews-grid">
            <div className="lg:col-span-2">
              <h3 className="sn-reviews-title">Customer Reviews</h3>
              <div className="sn-reviews-list">
                {reviews.length === 0 && <p className="sn-no-reviews">No reviews yet.</p>}

                {reviews.map((rev) => (
                  <ReviewCard key={rev._id} review={rev} currentUser={user} onDelete={async (reviewId) => {
                    try {
                      const res = await fetch(`${API_URL}/api/cakes/${id}/reviews/${reviewId}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      const data = await res.json();
                      if (data.success) {
                        toast.success('Review deleted');
                        handleReviewDeleted(reviewId);
                      } else {
                        toast.error(data.message || 'Unable to delete');
                      }
                    } catch (e) {
                      console.error(e);
                      toast.error('Unable to delete review');
                    }
                  }} />
                ))}
              </div>
            </div>

            <div>
              <ReviewForm productId={id} currentUser={user} onReviewAdded={handleReviewAdded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCake;
