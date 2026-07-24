import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";

const statusVariant = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
};

const OrderList = ({ orders = [], onViewOrder }) => {
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders Yet"
        description="You haven't placed any orders yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card
          key={order._id}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {/* Left */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.orderNumber}
            </h3>

            <p className="text-sm text-gray-500">{order.createdAt}</p>

            <p className="text-sm text-gray-700">{order.totalItems} Items</p>

            <p className="font-semibold text-black">₹{order.totalAmount}</p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Badge variant={statusVariant[order.status] || "default"}>
              {order.status}
            </Badge>

            <Button variant="outline" onClick={() => onViewOrder?.(order)}>
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
