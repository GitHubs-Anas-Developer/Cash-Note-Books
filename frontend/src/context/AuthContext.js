import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constant/Url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null); // Track user state

  // Fetch authenticated user profile
  const {
    data: fetchedUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/api/auth/profile`, {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    onSuccess: (data) => {
      setUser(data); // Set user state on success
    },
  });

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, credentials, {
        withCredentials: true,
      });
      queryClient.invalidateQueries(["auth"]);
      setUser(res.data); // Set user state after login
      return res.data;
    } catch (error) {
      console.log("error", error);

      throw error || "Login failed";
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/register`, userData);
      return res.data;
    } catch (error) {
      throw error || "Registration failed";
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      queryClient.clear(); // Clear all cached queries
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isError, login, register, logout, fetchedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
