import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Define mutation for login
  const mutation = useMutation({
    mutationFn: () => login(loginForm),
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect on success
    },
    onError: (error) => {

      console.log("error",error);
      
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
<div className="w-full max-w-sm p-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 shadow-2xl rounded-xl">
<h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Welcome Back
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={loginForm.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={loginForm.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[52px] transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-medium py-3 rounded-md transition duration-300 ${
                mutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Sign Up Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline focus:outline-none">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
