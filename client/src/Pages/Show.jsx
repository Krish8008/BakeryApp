import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

function ShowCake() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cake, setCake] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetch(`${API_URL}/api/cakes/${id}`)
      .then((res) => res.json())
      .then((data) => setCake(data.cake))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cake?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/cakes/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Cake deleted successfully!");
        navigate("/cakes");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

const handleBuy = () => {
  if (!token) {
    alert("Please login first.");

    navigate("/login", {
      state: {
        from: `/cake/${id}/buy`,
      },
    });

    return;
  }

  navigate(`/cake/${id}/buy`);
};

  if (!cake) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pink-50">
        <h2 className="text-2xl font-semibold text-pink-600">
          Loading Cake...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 p-6 md:p-10">

          {/* Images */}
          <div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={cake.images?.[selectedImage] || "/no-image.png"}
                alt={cake.name}
                className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {cake.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={cake.name}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-pink-500"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
              {cake.category}
            </span>

            <h1 className="text-5xl font-bold mt-4">
              {cake.name}
            </h1>

            <p className="text-gray-600 mt-5 leading-relaxed">
              {cake.description}
            </p>

            <h2 className="text-4xl font-bold text-pink-600 mt-6">
              ₹{cake.price}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Weight
                </p>
                <h3 className="font-semibold">
                  {cake.weight}
                </h3>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-500 text-sm">
                  Flavor
                </p>
                <h3 className="font-semibold">
                  {cake.flavor}
                </h3>
              </div>

            </div>

            {cake.eggless && (
              <div className="mt-6">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  🌱 Eggless Cake
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-10 flex-wrap">

              <button
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuy}
                className="flex-1 border border-pink-600 text-pink-600 hover:bg-pink-50 py-3 rounded-xl font-semibold"
              >
                Buy Now
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => navigate(`/cake/${id}/edit`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Delete
                  </button>
                </>
              )}

            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>🚚 Fast Delivery</span>
                <span>🎂 Freshly Baked</span>
                <span>⭐ Premium Quality</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ShowCake;