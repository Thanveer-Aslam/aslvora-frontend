import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
