import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

export const customerNavLinks = [
  { name: "Home", path: "/" },
  { name: "Men", path: "/products?category=Men" },
  { name: "Women", path: "/products?category=Women" },
  { name: "Kids", path: "/products?category=Kids" },
  { name: "Sale", path: "/products?sale=true" },
  { name: "New Arrivals", path: "/products?sort=newest" },
];

export const adminNavLinks = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
