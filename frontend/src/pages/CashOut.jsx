import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { baseUrl } from "../constant/Url";
import axios from "axios";
import {
  FaEdit,
  FaExclamationTriangle,
  FaSearch,
  FaServer,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function CashOut() {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cashOut"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/cashbook/cash-out`, {
        withCredentials: "include",
      });
      return response.data;
    },
  });

  // Delete Mutation (Optimistic Update)
  const deleteCashOut = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${baseUrl}/api/cashbook/${id}`, {
        withCredentials: "include",
      });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["cashOut"]);
      const previousData = queryClient.getQueryData(["cashOut"]);

      // Optimistic UI update
      queryClient.setQueryData(["cashOut"], (oldData) => ({
        ...oldData,
        cashOut: oldData?.cashOut?.filter((entry) => entry._id !== id) || [],
      }));

      return { previousData };
    },
    onError: (_error, _id, context) => {
      toast.error("Failed to delete Cash Out. Please try again.");
      queryClient.setQueryData(["cashOut"], context.previousData);
    },
    onSuccess: () => {
      toast.success("Cash Out deleted successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cashOut"]);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader
          color="blue"
          size={70}
          cssOverride={{ borderWidth: "6px" }}
        />
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred.";
    const statusCode = error?.response?.status;
    let errorIcon = <FaExclamationTriangle size={50} />;

    if (statusCode === 404) errorIcon = <FaSearch size={50} />;
    if (statusCode === 500) errorIcon = <FaServer size={50} />;

    return (
      <div className="flex items-center justify-center min-h-screen text-center flex-col">
        <div className="mb-4">{errorIcon}</div>
        <p>
          {statusCode === 500
            ? "Server error. Please try again later."
            : errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center mt-5">
        Cash Out Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.cashOut?.map((entry) => (
          <div
            key={entry._id}
            className="p-4 bg-red-100 rounded-lg shadow-md border-l-4 border-red-500"
          >
            <h2 className="text-lg font-semibold text-red-700">{entry.name}</h2>
            <p className="mt-2 text-gray-800">
              <strong>Amount:</strong> ₹{entry.cash_out.toLocaleString()}
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Status:</strong> {entry.status}
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Type:</strong>{" "}
              {entry.transactionType === "cash_out" ? "Cash Out" : "Unknown"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Date:</strong>{" "}
              {new Date(entry.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            {/* Edit and Delete Buttons */}
            <div className="mt-4 flex justify-between space-x-2">
              <Link
                to={`/cash-out/edit/${entry._id}`}
                className="bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => deleteCashOut.mutate(entry._id)}
                className="bg-red-500 text-white p-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 flex items-center"
                disabled={deleteCashOut.isLoading} // Disable button when loading
              >
                {deleteCashOut.isLoading ? (
                  <ClipLoader size={15} color="white" />
                ) : (
                  <FaTrashAlt />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashOut;
