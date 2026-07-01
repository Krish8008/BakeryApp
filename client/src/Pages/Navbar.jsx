import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Cake } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();   
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("logout successful...!");
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
              Sweet Cakes
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
              <button className="text-gray-700 hover:text-pink-600 font-medium" onClick={logout}>Logout</button>
            ) : (
            <>
              <Link className="text-gray-700 hover:text-pink-600 font-medium" to="/login">Login</Link>
              <Link className="text-gray-700 hover:text-pink-600 font-medium" to="/signup">Signup</Link>
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