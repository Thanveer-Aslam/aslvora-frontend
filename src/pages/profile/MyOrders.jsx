import { useEffect } from "react";

import OrderList from "../../components/profile/OrderList";
import useOrders from "../../hooks/useOrder";

const MyOrders = () => {
  const { orders, loading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <OrderList orders={orders} />;
};

export default MyOrders;
