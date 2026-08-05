import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Cake, UserCircle  } from "lucide-react";
import toast from "react-hot-toast";



const Navbar = ({ setToken, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();   
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  

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
            className="md:hidden"
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
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link to="/">Home</Link>
              <Link to="/cakes">Cakes</Link>
              <Link to="/add-cake">Add Cake</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>

              <Link
                to="/order"
                className="bg-pink-600 text-white py-2 rounded-full text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;