import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Cake,
  LogOut,
  Menu,
  ShoppingBag,
  UserCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../CartContext";

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-[#fff1e5] text-[#773d33]"
      : "text-[#634b43] hover:bg-[#fff1e5] hover:text-[#773d33]"
  }`;

const Navbar = ({ setToken, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Ref for profile dropdown
  const profileRef = useRef(null);

  const token = localStorage.getItem("token");

  const { count } = useCart();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
  }

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setShowProfile(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    closeMenu();

    toast.success("You have been logged out.");

    navigate("/");
  };

  const commonLinks = (
    <>
      <NavLink
        to="/"
        end
        className={navClass}
        onClick={closeMenu}
      >
        Home
      </NavLink>

      <NavLink
        to="/cakes"
        className={navClass}
        onClick={closeMenu}
      >
        Cakes
      </NavLink>

      <NavLink
        to="/about"
        className={navClass}
        onClick={closeMenu}
      >
        Our story
      </NavLink>

      <NavLink
        to="/contact"
        className={navClass}
        onClick={closeMenu}
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eadbd1] bg-[#fffaf7]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex h-[4.5rem] items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4c2626] text-[#f9d8b4]">
              <Cake size={19} />
            </span>

            <span className="font-serif text-2xl font-semibold tracking-tight text-[#4c2626]">
              CakeCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {commonLinks}

            {/* Admin Links */}
            {user?.role === "admin" && (
              <>
                <NavLink
                  to="/add-cake"
                  className={navClass}
                  onClick={closeMenu}
                >
                  Add cake
                </NavLink>

                <NavLink
                  to="/admin/orders"
                  className={navClass}
                  onClick={closeMenu}
                >
                  Orders
                </NavLink>
              </>
            )}

            {/* My Orders */}
            {token && (
              <NavLink
                to="/my-bookings"
                className={navClass}
                onClick={closeMenu}
              >
                My orders
              </NavLink>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 lg:flex">

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative rounded-full p-2 text-[#4c2626] transition hover:bg-[#fff1e5]"
            >
              <ShoppingBag size={21} />

              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#a1423a] px-1 text-[10px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            {/* Logged In User */}
            {token && user ? (
              <div
                ref={profileRef}
                className="relative"
              >

                {/* Profile Button */}
                <button
                  type="button"
                  onClick={() =>
                    setShowProfile((open) => !open)
                  }
                  aria-expanded={showProfile}
                  className="flex items-center gap-2 rounded-full border border-[#eadbd1] px-3 py-1.5 text-sm font-semibold text-[#4c2626] transition hover:bg-white"
                >
                  <UserCircle size={20} />

                  <span className="max-w-24 truncate">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-[#eadbd1] bg-white p-2 shadow-xl">

                    {/* User Info */}
                    <div className="border-b border-[#f1e6df] px-3 py-3">

                      <p className="font-semibold text-[#38231f]">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-[#7d6259]">
                        {user.email}
                      </p>

                    </div>

                    {/* Profile */}
                    <NavLink
                      to="/profile"
                      onClick={closeMenu}
                      className="mt-1 block rounded-xl px-3 py-2 text-sm text-[#38231f] transition hover:bg-[#fff1e5]"
                    >
                      My profile
                    </NavLink>

                    {/* Orders */}
                    <NavLink
                      to="/my-bookings"
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-sm text-[#38231f] transition hover:bg-[#fff1e5]"
                    >
                      My orders
                    </NavLink>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#a1423a] transition hover:bg-[#fff1e5]"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Login */}
                <NavLink
                  to="/login"
                  className="text-sm font-bold text-[#773d33]"
                >
                  Log in
                </NavLink>

                {/* Signup */}
                <NavLink
                  to="/signup"
                  className="rounded-full bg-[#4c2626] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#683533]"
                >
                  Join us
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-1 lg:hidden">

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative rounded-full p-2 text-[#4c2626]"
            >
              <ShoppingBag size={21} />

              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#a1423a] px-1 text-[10px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={
                isOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="rounded-full p-2 text-[#4c2626] transition hover:bg-[#fff1e5]"
            >
              {isOpen ? <X /> : <Menu />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-[#eadbd1] py-3 lg:hidden">

            <div className="flex flex-col gap-1">

              {commonLinks}

              {/* My Orders */}
              {token && (
                <NavLink
                  to="/my-bookings"
                  className={navClass}
                  onClick={closeMenu}
                >
                  My orders
                </NavLink>
              )}

              {/* Admin */}
              {user?.role === "admin" && (
                <>
                  <NavLink
                    to="/add-cake"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    Add cake
                  </NavLink>

                  <NavLink
                    to="/admin/orders"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    Admin orders
                  </NavLink>
                </>
              )}

              {/* Logged In */}
              {token ? (
                <>
                  <NavLink
                    to="/profile"
                    className={navClass}
                    onClick={closeMenu}
                  >
                    My profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-2 rounded-full px-3 py-2 text-left text-sm font-bold text-[#a1423a]"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </>
              ) : (
                /* Logged Out */
                <div className="mt-2 grid grid-cols-2 gap-2">

                  <NavLink
                    to="/login"
                    className="rounded-full border border-[#d9c6ba] px-3 py-2.5 text-center text-sm font-bold"
                    onClick={closeMenu}
                  >
                    Log in
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="rounded-full bg-[#4c2626] px-3 py-2.5 text-center text-sm font-bold text-white"
                    onClick={closeMenu}
                  >
                    Join us
                  </NavLink>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;