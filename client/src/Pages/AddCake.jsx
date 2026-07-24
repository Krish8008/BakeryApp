import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../config/api";

const AddCake = () => {
  
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Login Required
        </h1>

        <p className="mt-3 text-gray-600">
          Please login to access this page.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

if (user?.role !== "admin") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied
        </h1>

        <p className="mt-3 text-gray-600">
          Only administrators can add cakes.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

  const [cake, setCake] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    weight: "",
    flavor: "",
    eggless: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCake((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setCake((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cake.images.length === 0) {
      return alert("Please select at least one image");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", cake.name);
      formData.append("description", cake.description);
      formData.append("price", cake.price);
      formData.append("category", cake.category);
      formData.append("weight", cake.weight);
      formData.append("flavor", cake.flavor);
      formData.append("eggless", cake.eggless);

      cake.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(
        `${API_URL}/api/cakes`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      console.log("response", response);
      console.log("data", data);

      if (response.ok) {
        alert("Cake Added Successfully!");

        setCake({
          name: "",
          description: "",
          price: "",
          category: "",
          images: [],
          weight: "",
          flavor: "",
          eggless: false,
        });

        document.getElementById("cakeImages").value = "";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Add New Cake
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Cake Name"
            value={cake.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Cake Description"
            value={cake.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={cake.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="category"
            value={cake.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Cupcake">Cupcake</option>
            <option value="Pastry">Pastry</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Fruit">Fruit</option>
            <option value="Custom">Custom</option>
          </select>

          <div>
            <label className="block font-medium mb-2">
              Upload Images (Max 5)
            </label>

            <input
              id="cakeImages"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <p className="text-sm text-gray-500 mt-2">
              Select up to 5 images
            </p>
          </div>

          {cake.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cake.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="h-32 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          <select
            name="weight"
            value={cake.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Weight</option>
            <option value="0.5kg">0.5kg</option>
            <option value="1kg">1kg</option>
            <option value="1.5kg">1.5kg</option>
            <option value="2kg">2kg</option>
            <option value="3kg">3kg</option>
            <option value="5kg">5kg</option>
          </select>

          <input
            type="text"
            name="flavor"
            placeholder="Flavor"
            value={cake.flavor}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="eggless"
              checked={cake.eggless}
              onChange={handleChange}
            />
            Eggless Cake
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Uploading..." : "Add Cake"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCake;




