import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Cake, UserCircle, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../CartContext";


const Navbar = ({ setToken, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();   
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const { count } = useCart();
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <nav className="bg-pink-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Cake className="text-pink-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-pink-600">
              CakeCraft
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/cakes"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              Cakes
            </Link>

            {user?.role === "admin" && (
            <Link
              to="/add-cake"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              Add Cake
            </Link>
          )}

          {token && (
            <Link
              to="/my-bookings"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              My Orders
            </Link>
          )}

          {user?.role === "admin" && (
          <Link to="/admin/orders">
            Orders
          </Link>
        )}

            <Link
              to="/about"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-pink-600 font-medium"
            >
              Contact
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart />
              {count > 0 && (
                <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {count}
                </span>
              )}
            </Link>

            {token ? (
  <div className="relative">

    <button
      onClick={() => setShowProfile(!showProfile)}
      className="flex items-center gap-2"
    >
      <UserCircle size={34} />

      <span className="font-medium">
        {user?.name}
      </span>
    </button>

    {showProfile && (
      <div className="absolute right-0 mt-3 w-60 bg-white shadow-xl rounded-xl border">

        <div className="p-4 border-b">

          <h3 className="font-bold">
            {user?.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>

          <p className="text-pink-600 text-sm mt-1">
            {user?.role.toUpperCase()}
          </p>

        </div>

        <Link
          to="/profile"
          className="block px-4 py-3 hover:bg-pink-50"
        >
          My Profile
        </Link>

        <Link
          to="/my-bookings"
          className="block px-4 py-3 hover:bg-pink-50"
        >
          My Orders
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin/orders"
            className="block px-4 py-3 hover:bg-pink-50"
          >
            Admin Orders
          </Link>
        )}

        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
        >
          Logout
        </button>

      </div>
    )}

  </div>
) : (
  <>
    <Link to="/login">Login</Link>

    <Link to="/signup">Signup</Link>
  </>
)}

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="md:hidden rounded-lg p-2 transition-colors hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-pink-600" />
            ) : (
              <Menu className="w-7 h-7 text-pink-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-pink-100 py-3">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
              >
                Home
              </Link>
              <Link
                to="/cakes"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
              >
                Cakes
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/add-cake"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
                >
                  Add Cake
                </Link>
              )}
              {token && (
                <Link
                  to="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
                >
                  My Orders
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  to="/admin/orders"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
                >
                  Admin Orders
                </Link>
              )}
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
              >
                Cart{count > 0 ? ` (${count})` : ""}
              </Link>
              {token ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="rounded-lg px-3 py-2.5 text-left font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 font-medium text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-pink-600 px-3 py-2.5 text-center font-medium text-white transition-colors hover:bg-pink-700"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;