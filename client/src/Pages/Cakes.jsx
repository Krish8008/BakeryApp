import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CakeSlice, ChevronRight, LoaderCircle, Sparkles, Star } from "lucide-react";
import { API_URL } from "../config/api";

function Cakes() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changingPage, setChangingPage] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCakes: 0, hasNextPage: false, hasPreviousPage: false });

  async function fetchCakes(page, initialLoad = false) {
    if (initialLoad) setLoading(true);
    else setChangingPage(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/cakes?page=${page}&limit=20`);
      const data = await response.json();

      if (data.success) {
        setCakes(data.cakes);
        setPagination(data.pagination);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.message || "We couldn't load the collection. Please try again.");
      }
    } catch {
      setError("We couldn't load the collection. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setChangingPage(false);
    }
  }

  useEffect(() => {
    fetchCakes(1, true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffaf7] gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4c2626] text-[#f9d8b4] shadow-lg"><CakeSlice size={27} /></span>
        <LoaderCircle className="animate-spin text-[#b45d45]" size={24} />
        <p className="font-medium tracking-wide text-[#5f3a35]">Preparing something lovely…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] text-[#38231f]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#4c2626] py-20 text-[#fff9f2] md:py-24">
        <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[#d98a63]/25 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#f7d3a7]/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f9d8b4]/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f9d8b4]"><Sparkles size={14} /> The CakeCraft Collection</span>
          <h1 className="mb-5 font-serif text-5xl font-semibold leading-tight md:text-7xl">
            Made for the moments that matter.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-[#fae9dc]/85 md:text-lg">
            Hand-finished celebration cakes, baked in small batches and delivered with a little extra delight.
          </p>
        </div>
      </section>

      {/* Cake Grid */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-11 flex flex-col gap-4 border-b border-[#eadbd1] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b45d45]">Curated for celebrations</p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">Our signature cakes</h2>
          </div>
          <p className="text-sm text-[#7d6259]">{pagination.totalCakes} {pagination.totalCakes === 1 ? "creation" : "creations"} to discover</p>
        </div>

        {error ? (
          <div className="rounded-3xl border border-[#eadbd1] bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-semibold">The collection is taking a moment.</p>
            <p className="mt-2 text-[#7d6259]">{error}</p>
            <button onClick={() => fetchCakes(pagination.page)} className="mt-6 rounded-full bg-[#4c2626] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#683533]">Try again</button>
          </div>
        ) : cakes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d9c6ba] bg-white px-6 py-16 text-center text-[#7d6259]">No cakes are available just yet.</div>
        ) : (
          <div className={`grid grid-cols-1 gap-7 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${changingPage ? "opacity-40" : "opacity-100"}`} aria-busy={changingPage}>
            {cakes.map((cake) => (
              <Link to={`/cake/${cake._id}`} key={cake._id} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b45d45] focus-visible:ring-offset-4">
                <div
                  className="h-full overflow-hidden rounded-[1.5rem] border border-[#eadbd1] bg-white shadow-[0_8px_25px_rgba(73,38,33,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_38px_rgba(73,38,33,0.15)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        cake.images?.[0] ||
                        "https://via.placeholder.com/500x350"
                      }
                      alt={cake.name}
                      loading="lazy"
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#653632] backdrop-blur">
                      {cake.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl font-semibold leading-tight text-[#38231f]">
                      {cake.name}
                      </h3>
                      {cake.ratings > 0 && <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#8c4b36]"><Star size={13} fill="currentColor" />{cake.ratings}</span>}
                    </div>

                    <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#7d6259]">
                      {cake.description}
                    </p>

                    <div className="mb-5 flex gap-2 text-xs font-medium text-[#7d6259]">
                      <span className="rounded-full bg-[#fff5ee] px-3 py-1.5">{cake.weight}</span>
                      <span className="truncate rounded-full bg-[#fff5ee] px-3 py-1.5">{cake.flavor}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#f1e6df] pt-4">
                      <h4 className="text-xl font-bold text-[#9b4d39]">
                        ₹{cake.price}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-[#4c2626] transition-transform group-hover:translate-x-1">Explore <ChevronRight size={16} /></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!error && cakes.length > 0 && (
          <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#eadbd1] pt-8 sm:flex-row">
            <p className="text-sm text-[#7d6259]">Page <strong className="font-semibold text-[#38231f]">{pagination.page}</strong> of {pagination.totalPages}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => fetchCakes(pagination.page - 1)} disabled={!pagination.hasPreviousPage || changingPage} className="inline-flex items-center gap-2 rounded-full border border-[#d9c6ba] bg-white px-5 py-3 text-sm font-bold transition hover:border-[#4c2626] disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={16} /> Previous</button>
              <button onClick={() => fetchCakes(pagination.page + 1)} disabled={!pagination.hasNextPage || changingPage} className="inline-flex items-center gap-2 rounded-full bg-[#4c2626] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#683533] disabled:cursor-not-allowed disabled:opacity-40">{changingPage ? <LoaderCircle className="animate-spin" size={16} /> : <>Next <ArrowRight size={16} /></>}</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cakes;
