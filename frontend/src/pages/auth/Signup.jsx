import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  // Use mutation for registration
  const mutation = useMutation({
    mutationFn: async () => {
      return await register({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
      });
    },
    onSuccess: (response) => {
      toast.success(response.message || "Registration successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full mt-1 border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 border"
              value={registerForm.username}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 border"
              value={registerForm.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-1 border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 border"
              value={registerForm.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full mt-1 border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 border"
              value={registerForm.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-medium py-3 rounded-md transition duration-300 ${
                mutation.isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
