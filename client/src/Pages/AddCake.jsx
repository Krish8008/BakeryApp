import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CakeSlice,
  Check,
  ImagePlus,
  LockKeyhole,
  Upload,
} from "lucide-react";
import { API_URL } from "../config/api";

const AddCake = () => {
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

  const imagePreviews = useMemo(
    () => cake.images.map((image) => URL.createObjectURL(image)),
    [cake.images]
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((previewUrl) =>
        URL.revokeObjectURL(previewUrl)
      );
    };
  }, [imagePreviews]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  /* =========================
     LOGIN CHECK
  ========================= */
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#eadbd1] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#9b4d39]">
            <LockKeyhole size={25} />
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#38231f]">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#7d6259]">
            Please login to access the cake management page.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#9b4d39] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#773d33]"
          >
            Go to Login
            <ArrowLeft size={15} className="rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  /* =========================
     ADMIN CHECK
  ========================= */
  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#eadbd1] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#9b4d39]">
            <LockKeyhole size={25} />
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#38231f]">
            Access Denied
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#7d6259]">
            Only administrators can add cakes.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#4c2626] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#683533]"
          >
            Go Home
            <ArrowLeft size={15} />
          </Link>
        </div>
      </div>
    );
  }

  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCake((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     IMAGE CHANGE
  ========================= */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      e.target.value = "";
      return;
    }

    setCake((prev) => ({
      ...prev,
      images: files,
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cake.images.length === 0) {
      return toast.error("Please select at least one image");
    }

    const storedToken = localStorage.getItem("token")?.trim();

    if (!storedToken) {
      toast.error("Your session has expired. Please login again.");
      return;
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

      const response = await fetch(`${API_URL}/api/cakes`, {
        method: "POST",
        headers: {
          Authorization: storedToken.startsWith("Bearer ")
            ? storedToken
            : `Bearer ${storedToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log("response:", response);
      console.log("data:", data);

      if (response.ok) {
        toast.success("Cake added successfully!");

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
        toast.error(data.message || "Failed to add cake");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-10 text-[#38231f] md:py-14">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#765f58] transition hover:text-[#9b4d39]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4c2626] text-[#f8d6af]">
              <CakeSlice size={23} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
                Admin Panel
              </p>

              <h1 className="mt-1 font-serif text-3xl font-semibold md:text-4xl">
                Add New Cake
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#7d6259]">
                Add a new cake to your bakery collection.
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BASIC INFORMATION */}
            <div>
              <h2 className="font-serif text-xl font-semibold">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-[#8a7168]">
                Enter the basic details of your cake.
              </p>
            </div>

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                Cake Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Chocolate Truffle Cake"
                value={cake.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the cake..."
                value={cake.description}
                onChange={handleChange}
                rows="4"
                className="w-full resize-none rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                required
              />
            </div>

            {/* PRICE + CATEGORY */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8a7168]">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={cake.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                  Category
                </label>

                <select
                  name="category"
                  value={cake.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm outline-none transition focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
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
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                Cake Images
              </label>

              <label
                htmlFor="cakeImages"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#eadbd1] bg-[#fffaf7] px-5 py-8 text-center transition hover:border-[#b45d45] hover:bg-[#fff5ee]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#9b4d39]">
                  <ImagePlus size={23} />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#38231f]">
                  Choose cake images
                </p>

                <p className="mt-1 text-xs text-[#8a7168]">
                  PNG, JPG or WEBP · Maximum 5 images
                </p>

                <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4c2626] px-4 py-2 text-xs font-semibold text-white">
                  <Upload size={14} />
                  Select Images
                </span>
              </label>

              <input
                id="cakeImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />

              {/* PREVIEWS */}
              {cake.images.length > 0 && (
                <div className="mt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#765f58]">
                      Selected Images
                    </p>

                    <span className="text-xs text-[#8a7168]">
                      {cake.images.length}/5
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                    {imagePreviews.map((previewUrl, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-[#eadbd1] bg-[#fffaf7]"
                      >
                        <img
                          src={previewUrl}
                          alt={`Cake preview ${index + 1}`}
                          className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#9b4d39] shadow-sm">
                          <Check size={13} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WEIGHT + FLAVOR */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                  Weight
                </label>

                <select
                  name="weight"
                  value={cake.weight}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm outline-none transition focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
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
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f58]">
                  Flavor
                </label>

                <input
                  type="text"
                  name="flavor"
                  placeholder="e.g. Chocolate"
                  value={cake.flavor}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] px-4 py-3 text-sm outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                  required
                />
              </div>
            </div>

            {/* EGGLESS */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eadbd1] bg-[#fffaf7] p-4 transition hover:bg-[#fff5ee]">
              <input
                type="checkbox"
                name="eggless"
                checked={cake.eggless}
                onChange={handleChange}
                className="h-4 w-4 accent-[#9b4d39]"
              />

              <div>
                <p className="text-sm font-semibold text-[#38231f]">
                  Eggless Cake
                </p>

                <p className="mt-0.5 text-xs text-[#8a7168]">
                  Mark this cake as eggless.
                </p>
              </div>
            </label>

            {/* SUBMIT */}
            <div className="border-t border-[#eadbd1] pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2 ${
                  loading
                    ? "cursor-not-allowed bg-[#a28c84]"
                    : "bg-[#9b4d39] hover:bg-[#773d33]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Uploading Cake...
                  </>
                ) : (
                  <>
                    <Upload size={17} />
                    Add Cake
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCake;