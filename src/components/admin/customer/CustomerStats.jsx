import {
  People,
  PersonAdd,
  PersonOff,
  VerifiedUser,
} from "@mui/icons-material";

import StatsGrid from "../dashboard/StatsGrid";

const CustomerStats = ({ customers = [] }) => {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => !customer.isBlocked,
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => customer.isBlocked,
  ).length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newCustomers = customers.filter((customer) => {
    const joinedDate = new Date(customer.createdAt);

    return (
      joinedDate.getMonth() === currentMonth &&
      joinedDate.getFullYear() === currentYear
    );
  }).length;

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: People,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: VerifiedUser,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Blocked Customers",
      value: blockedCustomers,
      icon: PersonOff,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "New This Month",
      value: newCustomers,
      icon: PersonAdd,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return <StatsGrid stats={stats} />;
};

export default CustomerStats;
