import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

function EditCake() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchCake();
  }, []);

  const fetchCake = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/cakes/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setCake(data.cake);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      toast.error("Maximum 5 images allowed");
      return;
    }

    setCake((prev) => ({
      ...prev,
      newImages: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (cake.newImages?.length) {
        cake.newImages.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await fetch(
        `${API_URL}/api/cakes/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Cake Updated Successfully!");
        navigate(`/cake/${id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!cake.name) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Edit Cake
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            value={cake.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={cake.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={cake.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="category"
            value={cake.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Cupcake">Cupcake</option>
            <option value="Pastry">Pastry</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Fruit">Fruit</option>
            <option value="Custom">Custom</option>
          </select>

          {/* Current Images */}
          <div>
            <h3 className="font-semibold mb-3">
              Current Images
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cake.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-32 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* Upload New Images */}
          <div>
            <label className="block mb-2 font-medium">
              Replace Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <select
            name="weight"
            value={cake.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
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
            value={cake.flavor}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Cake"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditCake;