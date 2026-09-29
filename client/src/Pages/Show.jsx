import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CakeSlice,
  Check,
  Pencil,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import { API_URL } from "../config/api";

function ShowCake() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cake, setCake] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

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

  useEffect(() => {
    fetchCake();
  }, [fetchCake]);

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
        toast.error(data.message || "Failed to delete cake");
      }
    } catch (error) {
      console.error(error);
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

  if (!cake) {
    return (
      <main className="min-h-screen bg-[#fffaf7] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8d6af] text-[#4c2626]">
            <CakeSlice size={25} />
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#38231f]">
            Loading cake...
          </h2>

          <p className="mt-2 text-sm text-[#765f58]">
            Preparing something sweet for you.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      {/* =========================
          TOP SECTION
      ========================= */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        {/* BACK */}
        <button
          onClick={() => navigate("/cakes")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#765f58] transition hover:text-[#9b4d39]"
        >
          <ArrowLeft size={16} />
          Back to collection
        </button>

        {/* PRODUCT */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          {/* =========================
              IMAGE
          ========================= */}
          <div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#f5e9df]">
              <img
                src={cake.images?.[selectedImage] || "/no-image.png"}
                alt={cake.name}
                className="h-[430px] w-full object-cover md:h-[580px]"
              />

              {/* CATEGORY */}
              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#4c2626]/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f8d6af] backdrop-blur">
                  <CakeSlice size={13} />
                  {cake.category}
                </span>
              </div>

              {/* EGGLESS */}
              {cake.eggless && (
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#fffaf7] px-4 py-2 text-xs font-semibold text-[#4d7650] shadow-sm">
                  <Check size={14} />
                  Eggless
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            {cake.images?.length > 0 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {cake.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                      selectedImage === index
                        ? "border-[#9b4d39]"
                        : "border-[#eadbd1]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${cake.name} ${index + 1}`}
                      className="h-20 w-20 object-cover md:h-24 md:w-24"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================
              DETAILS
          ========================= */}
          <div className="flex flex-col justify-center">
            {/* SMALL LABEL */}
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b45d45]">
              CakeCraft Patisserie
            </p>

            {/* TITLE */}
            <h1 className="font-serif text-4xl font-semibold leading-tight text-[#38231f] md:text-6xl">
              {cake.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-xl text-base leading-7 text-[#765f58]">
              {cake.description}
            </p>

            {/* PRICE */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a7168]">
                Price
              </p>

              <p className="mt-1 font-serif text-4xl font-semibold text-[#9b4d39]">
                ₹{cake.price}
              </p>
            </div>

            {/* DETAILS */}
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#eadbd1] bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#b45d45]">
                  Weight
                </p>

                <p className="mt-2 text-sm font-semibold text-[#38231f]">
                  {cake.weight}
                </p>
              </div>

              <div className="rounded-2xl border border-[#eadbd1] bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#b45d45]">
                  Flavor
                </p>

                <p className="mt-2 text-sm font-semibold text-[#38231f]">
                  {cake.flavor}
                </p>
              </div>
            </div>

            {/* EGGLESS INFO */}
            {cake.eggless && (
              <div className="mt-5 flex max-w-xl items-center gap-3 rounded-2xl border border-[#dce9dc] bg-[#f5faf5] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3f0e3] text-[#4d7650]">
                  <Check size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#385c3c]">
                    Eggless cake
                  </p>

                  <p className="mt-0.5 text-xs text-[#6d806f]">
                    Prepared without eggs.
                  </p>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() =>
                  toast.success("Cart feature coming soon!")
                }
                className="flex-1 rounded-full border border-[#9b4d39] bg-white px-6 py-3.5 text-sm font-bold text-[#9b4d39] transition hover:bg-[#fff1e5]"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuy}
                className="flex-1 rounded-full bg-[#4c2626] px-6 py-3.5 text-sm font-bold text-[#fffaf7] transition hover:bg-[#683533]"
              >
                Buy Now
              </button>
            </div>

            {/* ADMIN */}
            {isAdmin && (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate(`/cake/${id}/edit`)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#eadbd1] bg-[#fffaf7] px-5 py-3 text-sm font-semibold text-[#765f58] transition hover:border-[#b45d45] hover:text-[#9b4d39]"
                >
                  <Pencil size={15} />
                  Edit Cake
                </button>

                <button
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ead5d1] bg-[#fffaf7] px-5 py-3 text-sm font-semibold text-[#a64b43] transition hover:bg-[#fff0ee]"
                >
                  <Trash2 size={15} />
                  Delete Cake
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          FEATURES
      ========================= */}
      <section className="border-y border-[#eadbd1] bg-white px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {/* CARD 1 */}
          <div className="rounded-3xl border border-[#eadbd1] bg-[#fffaf7] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#b45d45]">
              <CakeSlice size={20} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#38231f]">
              Freshly Baked
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#765f58]">
              Fresh ingredients, careful preparation, and a little extra love
              in every cake.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-[#eadbd1] bg-[#fffaf7] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#b45d45]">
              <Sparkles size={20} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#38231f]">
              Made Your Way
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#765f58]">
              Simple celebrations or custom designs, created to match your
              occasion.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-[#eadbd1] bg-[#fffaf7] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#b45d45]">
              <Truck size={20} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#38231f]">
              Reliable Delive
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#765f58]">
              Carefully prepared and delivered fresh for your special moment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
      ========================= */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#4c2626] px-6 py-12 text-center text-[#fffaf7] md:px-10 md:py-16">
          <div className="mx-auto max-w-2xl">
            <Sparkles
              size={22}
              className="mx-auto text-[#f8d6af]"
            />

            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f8d6af]">
              CakeCraft Patisserie
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Every celebration deserves
              <br />
              something memorable.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#f9e8d9]/75">
              From the first idea to the final slice, we put care into every
              cake we create.
            </p>

            <button
              onClick={() => navigate("/cakes")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f8d6af] px-6 py-3 text-sm font-bold text-[#4c2626] transition hover:bg-white"
            >
              Explore the collection
              <ArrowLeft
                size={16}
                className="rotate-180"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShowCake;