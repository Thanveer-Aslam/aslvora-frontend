import { CalendarDays, RefreshCw } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const DashboardHeader = () => {
  const { fetchDashboard } = useAdmin();
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleRefresh = () => {
    fetchDashboard();
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back,
          <span className="ml-1 font-semibold text-red-600">
            {user?.fullName || "Admin"}
          </span>
          👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-gray-600">
          <CalendarDays size={18} />

          <span className="text-sm font-medium">{today}</span>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
