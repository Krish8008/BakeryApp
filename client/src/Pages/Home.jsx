import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CakeSlice,
  Heart,
  Leaf,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { API_URL } from "../config/api";

const highlights = [
  {
    icon: CakeSlice,
    title: "Made to order",
    text: "Every detail is finished with care for your occasion.",
  },
  {
    icon: Leaf,
    title: "Thoughtful ingredients",
    text: "Fresh bakes, beautiful flavours and eggless options.",
  },
  {
    icon: Truck,
    title: "Reliable delivery",
    text: "A celebration-ready cake, delivered at the right time.",
  },
];

function Home() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/cakes?page=1&limit=6`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("Unable to load cakes")),
      )
      .then((data) => {
        if (active && data.success) setCakes(data.cakes || []);
      })
      .catch(() => {
        if (active) setCakes([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#fffaf7] text-[#38231f]">
      <section className="relative isolate overflow-hidden bg-[#4c2626] px-6 py-24 text-[#fffaf7] md:py-32">
        <div className="absolute -left-20 top-0 -z-10 h-96 w-96 rounded-full bg-[#db8b64]/25 blur-3xl" />
        <div className="absolute -bottom-36 right-0 -z-10 h-96 w-96 rounded-full bg-[#f5c997]/20 blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f8d6af]/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#f8d6af]">
            <Sparkles size={14} /> CakeCraft patisserie
          </span>
          <h1 className="font-serif text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            A little luxury for every celebration.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#f9e8d9]/85">
            Beautifully handcrafted cakes for birthdays, milestones and the
            simply-special moments in between.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/cakes"
              className="inline-flex items-center gap-2 rounded-full bg-[#f8d6af] px-6 py-3.5 font-bold text-[#4c2626] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Explore the collection <ArrowRight size={17} />
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
            >
              Plan a custom cake
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-3xl border border-[#eadbd1] bg-white p-7 shadow-[0_8px_24px_rgba(73,38,33,0.05)]"
          >
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e5] text-[#9b4d39]">
              <Icon size={21} />
            </span>
            <h2 className="font-serif text-2xl font-semibold">{title}</h2>
            <p className="mt-2 leading-6 text-[#7d6259]">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#b45d45]">
              Fresh from our kitchen
            </p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              Loved by every guest
            </h2>
          </div>
          <Link
            to="/cakes"
            className="inline-flex items-center gap-1 font-bold text-[#773d33] hover:text-[#b45d45]"
          >
            View all cakes <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-[#eadbd1] bg-white"
              >
                <div className="h-64 animate-pulse bg-[#f4e7df]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#f4e7df]" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-[#f4e7df]" />
                </div>
              </div>
            ))}
          {!loading &&
            cakes.map((cake) => (
              <Link
                key={cake._id}
                to={`/cake/${cake._id}`}
                className="group overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-[0_8px_24px_rgba(73,38,33,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(73,38,33,0.14)]"
              >
                <img
                  loading="lazy"
                  src={
                    cake.images?.[0] || "https://via.placeholder.com/500x350"
                  }
                  alt={cake.name}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b45d45]">
                    {cake.category}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl font-semibold">
                      {cake.name}
                    </h3>
                    {cake.ratings > 0 && (
                      <span className="flex items-center gap-1 text-sm font-bold text-[#9b4d39]">
                        <Star size={14} fill="currentColor" />
                        {cake.ratings}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[#f1e6df] pt-4">
                    <strong className="text-lg text-[#9b4d39]">
                      ₹{cake.price}
                    </strong>
                    <span className="text-sm font-bold">
                      Discover <ArrowRight className="inline" size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {!loading && cakes.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#d9c6ba] bg-white p-10 text-center text-[#7d6259]">
            Our next batch is being prepared. Please visit the collection
            shortly.
          </div>
        )}
      </section>

      <section className="bg-[#f4e7df] px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#b45d45]">
              Your celebration, your way
            </p>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              Tell us what you are celebrating.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-7 text-[#7d6259]">
              From a thoughtful message to a show-stopping centrepiece, we would
              love to help create it.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#4c2626] px-6 py-3.5 font-bold text-white transition hover:bg-[#683533]"
          >
            Start a conversation <Heart size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
