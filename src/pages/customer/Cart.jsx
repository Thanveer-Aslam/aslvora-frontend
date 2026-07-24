import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

const Cart = () => {
    const { cart, loading, updateItem, removeItem, clearItems } = useCart();
    
    console.log("Cart State:", cart);

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading Cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/">Home</Link>

        <span>/</span>

        <span>Cart</span>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}

        <div className="space-y-5 lg:col-span-2">
          {cart.items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* Summary */}

        <CartSummary cart={cart} clearItems={clearItems} />
      </div>
    </div>
  );
};

export default Cart;
