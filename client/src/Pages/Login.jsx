import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Cake,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import { API_URL } from "../config/api";

function Login({ setToken, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUserr] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserr({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setToken(data.token);
        setUser(data.user);

        toast.success("Login successful!");

        // Redirect to the page the user originally wanted
        const redirectTo = location.state?.from || "/";

        navigate(redirectTo, {
          replace: true,
        });
      } else {
        toast.error(
          data.message || "Invalid credentials"
        );
      }
    } catch (error) {
      console.error("Login request failed", error);

      toast.error(
        "Unable to connect to the server. Check your internet connection and try again."
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
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#765f58]">
              Login to your CakeCraft account.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

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
                  autoComplete="email"
                  inputMode="email"
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#9b4d39] py-3.5 text-sm font-bold text-white transition hover:bg-[#773d33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-[#765f58]">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-bold text-[#9b4d39] transition hover:text-[#773d33]"
            >
              Sign Up
            </Link>

          </p>

        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-[#9a8178]">
          Welcome to CakeCraft.
        </p>

      </div>
    </div>
  );
}

export default Login;