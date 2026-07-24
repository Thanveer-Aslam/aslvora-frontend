import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import useWishlist from "../../hooks/useWishlist";
import useAuthStore from "../../store/authStore";

const CustomerLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { fetchWishlist } = useWishlist();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
