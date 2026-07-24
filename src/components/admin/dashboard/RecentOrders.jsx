import { useNavigate } from "react-router-dom";

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentOrders = ({ dashboard }) => {
  const navigate = useNavigate();

  const recentOrders = dashboard?.recentOrders || [];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>

          <p className="mt-1 text-sm text-gray-500">Latest customer orders</p>
        </div>

        <button
          onClick={() => navigate("/admin/orders")}
          className="text-sm font-semibold text-red-500 transition hover:text-red-600"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="max-h-[250px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 text-sm font-semibold text-gray-600">
                Order ID
              </th>

              <th className="py-3 text-sm font-semibold text-gray-600">
                Customer
              </th>

              <th className="py-3 text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="py-3 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="py-3 text-sm font-semibold text-gray-600">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr
                  key={order.orderNumber}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>

                  <td className="py-4 text-gray-700">
                    {order.user?.fullName || "Unknown"}
                  </td>

                  <td className="py-4 font-semibold text-gray-900">
                    ₹{order.totalAmount}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
