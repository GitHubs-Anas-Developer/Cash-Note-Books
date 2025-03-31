import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { baseUrl } from "../constant/Url";

function Profile() {
  const { user } = useAuth();

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });
    },
    onError: () => {
      toast.error("Error logging out. Please try again.");
    },
    onSuccess: () => {
      toast.success("Logged out successfully.");
      window.location.reload(); // Reload to clear session
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <FaUserCircle size={100} className="text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold">{user?.username || "John Doe"}</h2>
          <p className="text-gray-500 flex items-center">
            <FaEnvelope className="mr-2" />
            {user?.email || "johndoe@example.com"}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logoutMutation.mutate()}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
