import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  CakeSlice,
  ArrowLeft,
} from "lucide-react";

function PageNotFound() {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#fffaf7] px-6 py-12">

      <div className="mx-auto flex min-h-[75vh] max-w-lg items-center justify-center">

        <div className="w-full text-center">

          {/* 404 */}
          <div className="relative mx-auto mb-5 w-fit">

            <h1 className="font-serif text-8xl font-bold leading-none text-[#4c2626] sm:text-9xl">
              404
            </h1>

            <div className="absolute -right-7 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f8d6af] text-[#9b4d39] shadow-sm">
              <CakeSlice size={25} />
            </div>

          </div>

          {/* Heading */}
          <h2 className="font-serif text-2xl font-bold text-[#38231f] sm:text-3xl">
            Oops! This Page Is Missing
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#765f58] sm:text-base">
            Looks like this page has gone missing from our bakery.
            Don't worry — there's plenty of cake waiting for you.
          </p>

          {/* Cake Illustration */}
          <div className="mx-auto my-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#f9e7d5]">
            <CakeSlice
              size={62}
              strokeWidth={1.4}
              className="text-[#9b4d39]"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#9b4d39] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#773d33] focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              to="/cakes"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#d9c5ba] bg-white px-6 py-3 text-sm font-bold text-[#9b4d39] transition hover:border-[#9b4d39] hover:bg-[#fff5ef] focus:outline-none focus:ring-2 focus:ring-[#f8d6af] focus:ring-offset-2"
            >
              <ShoppingBag size={18} />
              Browse Cakes
            </Link>

          </div>

          {/* Back hint */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#8a7168] transition hover:text-[#4c2626]"
          >
            <ArrowLeft size={14} />
            Go back to the previous page
          </button>

        </div>

      </div>

    </div>
  );
}

export default PageNotFound;