import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Auth from "../pages/auth/Auth";

// Customer Pages
import Home from "../pages/customer/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Address from "../pages/customer/Address";
import Wishlist from "../pages/customer/Wishlist";

// Profile
import Profile from "../pages/profile/Profile";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import ProductsAdmin from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/AdminProfile";

// Layouts
import CustomerLayout from "../components/layout/CustomerLayout";
import AdminLayout from "../components/admin/layout/AdminLayout";

// Route Guards
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

// Store
import useAuthStore from "../store/authStore";

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Public Routes ================= */}
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* ================= Customer Routes ================= */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/addresses" element={<Address />} />
          </Route>
        </Route>

        {/* ================= Admin Routes ================= */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* ================= Fallback ================= */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
