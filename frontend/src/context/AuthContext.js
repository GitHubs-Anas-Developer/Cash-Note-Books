import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constant/Url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch authenticated user profile
  const {
    data: user,
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
  });

  // Login function
  const login = async (credentials) => {
    
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, credentials, {
        withCredentials: true,
      });
      queryClient.invalidateQueries(["auth"]);
      return res.data;
    } catch (error) {
      throw error.response?.data || "Login failed";
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/register`, userData);
      return res.data;
    } catch (error) {
      throw error.response?.data || "Registration failed";
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });
      queryClient.clear(); // Clear all cached queries
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
