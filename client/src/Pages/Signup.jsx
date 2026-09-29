import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Cake,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import { API_URL } from "../config/api";

function Signup({ setToken, setUser: setAuthenticatedUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setToken(data.token);
        setAuthenticatedUser(data.user);

        toast.success("Account created successfully!");

        navigate("/");
      } else {
        toast.error(
          data.message || "Unable to create account."
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#fffaf7] px-4 py-10 sm:py-14">

      <div className="mx-auto w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="mb-7 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4c2626] text-[#f9d8b4]">
              <Cake size={27} />
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#38231f]">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-[#765f58]">
              Join CakeCraft and order your favourite cakes.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-[#38231f]"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7d72]"
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] py-3 pl-10 pr-4 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                  required
                />

              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-[#38231f]"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7d72]"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] py-3 pl-10 pr-4 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                  required
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-[#38231f]"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7d72]"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf7] py-3 pl-10 pr-11 text-sm text-[#38231f] outline-none transition placeholder:text-[#a28c84] focus:border-[#b45d45] focus:bg-white focus:ring-2 focus:ring-[#f8d6af]"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (visible) => !visible
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7168] transition hover:text-[#4c2626]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#9b4d39] py-3.5 text-sm font-bold text-white transition hover:bg-[#773d33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-[#765f58]">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-[#9b4d39] transition hover:text-[#773d33]"
            >
              Log in
            </Link>

          </p>

        </div>

        {/* Small footer text */}
        <p className="mt-5 text-center text-xs text-[#9a8178]">
          Fresh cakes, made with care.
        </p>

      </div>
    </div>
  );
}

export default Signup;