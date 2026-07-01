import { Link } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-extrabold text-pink-600">404</h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found 🎂
        </h2>

        <p className="text-gray-600 mt-3">
          The page you're looking for seems to have disappeared...
          Maybe someone ate it! 🍰
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Cake"
          className="w-40 mx-auto my-8"
        />

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/cakes"
            className="flex items-center gap-2 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-3 rounded-lg transition"
          >
            <ShoppingBag size={20} />
            Browse Cakes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;