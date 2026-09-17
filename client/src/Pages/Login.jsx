import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../config/api";

function Login({setToken, setUser}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUserr] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

      toast.success("Login Successful 🎉");


      // Redirect to the page the user originally wanted
      const redirectTo = location.state?.from || "/";

      navigate(redirectTo, {
        replace: true,
      });
    } else {
          toast.error(data.message || "Invalid credentials");
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
    <div className="min-h-[100dvh] bg-pink-50 flex justify-center items-start sm:items-center px-4 py-8">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            inputMode="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-pink-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl focus:outline-pink-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;