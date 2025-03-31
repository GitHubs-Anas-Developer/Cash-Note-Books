import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isLoading, fetchedUser } = useAuth();
  const location = useLocation();

  useEffect(() => {}, [isLoading, fetchedUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader
          color="blue"
          size={70}
          cssOverride={{ borderWidth: "6px" }}
          className=""
        />
      </div>
    );
  }

  return fetchedUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
