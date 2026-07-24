import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import TopProducts from "../../components/admin/dashboard/TopProducts";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { dashboard, loading, error } = useAdmin({
    dashboard: true,
  });

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Statistics */}
      <DashboardStats dashboard={dashboard} />

      {/* Charts & Top Products */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders dashboard={dashboard} />
        </div>

        <TopProducts dashboard={dashboard} />
      </div>
    </div>
  );
};

export default Dashboard;
