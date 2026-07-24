import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

import StatsGrid from "./StatsGrid";

const DashboardStats = ({ dashboard }) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Products",
      value: dashboard?.totalProducts ?? 0,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
      linkText: "View all products",
      path: "/admin/products",
    },
    {
      title: "Total Orders",
      value: dashboard?.totalOrders ?? 0,
      icon: ShoppingCart,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      linkText: "View all orders",
      path: "/admin/orders",
    },
    {
      title: "Total Customers",
      value: dashboard?.totalCustomers ?? 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      linkText: "View all customers",
      path: "/admin/customers",
    },
    {
      title: "Revenue",
      value: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(dashboard?.totalRevenue || 0),
      icon: IndianRupee,
      color: "text-red-600",
      bgColor: "bg-red-100",
      linkText: "View all transactions",
      path: "/admin/orders",
    },
  ];

  return (
    <StatsGrid
      stats={stats.map((item) => ({
        ...item,
        onClick: () => navigate(item.path),
      }))}
    />
  );
};

export default DashboardStats;
