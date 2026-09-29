import { Link } from "react-router-dom";
import {
  ArrowRight,
  CakeSlice,
  Heart,
  Sparkles,
  Truck,
} from "lucide-react";

const values = [
  {
    icon: CakeSlice,
    title: "Freshly Baked",
    text: "Fresh ingredients, careful preparation, and a little extra love in every cake.",
  },
  {
    icon: Sparkles,
    title: "Made Your Way",
    text: "Simple celebrations or custom designs, created to match your occasion.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Carefully prepared and delivered fresh for your special moment.",
  },
];

function About() {
  return (
    <main className="overflow-hidden bg-[#fffaf7] text-[#38231f]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#4c2626] px-5 py-16 text-[#fffaf7] md:py-20">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#db8b64]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#f5c997]/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f8d6af]/30 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#f8d6af]">
            <Sparkles size={13} />
            Our Story
          </span>

          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Crafted with care,
            <br />
            made for moments.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#f9e8d9]/80 md:text-lg">
            At Cakes By CakeCraft, every cake is made to bring a little more
            sweetness to the moments that matter.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

          <div className="overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
              alt="Handcrafted celebration cake"
              className="h-[320px] w-full object-cover transition duration-500 hover:scale-105 md:h-[390px]"
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
              About CakeCraft
            </p>

            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
              More than just a cake.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#7d6259]">
              Welcome to{" "}
              <span className="font-semibold text-[#9b4d39]">
                Cakes By CakeCraft
              </span>
              , where every cake is created with passion, creativity, and
              attention to detail.
            </p>

            <p className="mt-3 text-base leading-7 text-[#7d6259]">
              From birthdays and anniversaries to weddings, baby showers and
              everyday celebrations, we create cakes that make special moments
              even sweeter.
            </p>

            <p className="mt-3 text-base leading-7 text-[#7d6259]">
              Our approach is simple — fresh ingredients, thoughtful designs,
              beautiful flavours and careful preparation for every order.
            </p>

            <Link
              to="/cakes"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4c2626] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#683533]"
            >
              Explore our cakes
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* WHY CAKECRAFT */}
      <section className="border-y border-[#eadbd1] bg-white px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-xl text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
              Why CakeCraft
            </p>

            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              Made with intention.
            </h2>

            <p className="mt-3 text-base leading-6 text-[#7d6259]">
              We focus on the little details that make every cake feel special.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#eadbd1] bg-[#fffaf7] p-5 transition hover:border-[#d8c2b6] hover:shadow-sm"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#9b4d39]">
                  <Icon size={19} />
                </span>

                <h3 className="font-serif text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#7d6259]">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
              Our Philosophy
            </p>

            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
              Simple ingredients.
              <br />
              Thoughtful details.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#7d6259]">
              We believe a great cake doesn't need to be complicated. It needs
              to be fresh, beautifully finished and made with genuine care.
            </p>

            <p className="mt-3 max-w-xl text-base leading-7 text-[#7d6259]">
              Whether you're celebrating a birthday, planning a milestone or
              simply looking for something special, we're here to make the
              occasion a little sweeter.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#4c2626] p-7 text-[#fffaf7] md:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#db8b64]/20 blur-3xl" />

            <Heart
              className="relative mb-5 text-[#f8d6af]"
              size={30}
              fill="currentColor"
            />

            <h3 className="relative font-serif text-2xl font-semibold">
              Every celebration deserves something memorable.
            </h3>

            <p className="relative mt-3 text-sm leading-6 text-[#f9e8d9]/75">
              From the first idea to the final slice, we put care into every
              cake we create.
            </p>
          </div>

        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-[#f4e7df] px-5 py-12 md:py-14">
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#b45d45]">
            Follow Along
          </p>

          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            See what we're baking.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#7d6259]">
            Discover our latest creations, custom designs and celebration
            moments on Instagram.
          </p>

          <a
            href="https://www.instagram.com/cakes_by_snehal_/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4c2626] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#683533]"
          >
            Follow @cakes_by_CakeCraft
            <ArrowRight size={15} />
          </a>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4c2626] px-5 py-14 text-[#fffaf7] md:py-16">
        <div className="mx-auto max-w-3xl text-center">

          <span className="mb-3 inline-flex items-center gap-2 text-sm text-[#f8d6af]">
            <Sparkles size={15} />
            Your celebration, your way
          </span>

          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Ready to find your cake?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#f9e8d9]/75">
            Explore our collection or find something made specially for your
            celebration.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              to="/cakes"
              className="inline-flex items-center gap-2 rounded-full bg-[#f8d6af] px-5 py-2.5 text-sm font-bold text-[#4c2626] transition hover:bg-white"
            >
              Explore cakes
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Plan a custom cake
              <Heart size={15} />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default About;