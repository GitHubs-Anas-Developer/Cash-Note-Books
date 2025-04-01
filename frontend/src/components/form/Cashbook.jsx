import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constant/Url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cashbook() {
  const { state } = useLocation();

  const navigate = useNavigate()

  const [cashForm, setCashForm] = useState({
    name: "",
    amount: "",
    transactionType: state?.option,
    status: "pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCashForm({ ...cashForm, [name]: value });
  };

  // Mutation hook to handle the API request
  const mutate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${baseUrl}/api/cashbook/create`,
        cashForm,
        {
          withCredentials: true, // Corrected `withCredentials` usage
        }
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
    onSuccess: () => {
      toast.success(`${state.option} Added successfully!`);
      navigate("/dashboard")
      setCashForm({
        name: "",
        amount: "",
        transactionType: state?.option,
        status: "pending",
      }); // Reset form after success
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate.mutate(); // Trigger mutation when form is submitted
  };

  return (
    <div className="max-w-lg mx-auto p-8 overflow-hidden min-h-screen">
      {/* Title Section */}
      <h1
        className={`text-3xl font-semibold text-center mb-8 ${
          state?.option === "cash_in" ? "text-green-600" : "text-red-600"
        }`}
      >
        {state?.option === "cash_in" ? "CASH IN" : "CASH OUT"}
      </h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={cashForm.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="block w-full p-4 mt-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-lg font-medium text-gray-800"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={cashForm.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="block w-full p-4 mt-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-semibold shadow-xl transform transition-all hover:scale-105 ${
              state?.option === "cash_in"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {state?.option === "cash_in" ? "Submit Cash In" : "Submit Cash Out"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cashbook;
