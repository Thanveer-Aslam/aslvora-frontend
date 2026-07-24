import { Link } from "react-router-dom";

const CartSummary = ({ cart, clearItems }) => {
  const totalItems = cart?.totalItems || 0;
  const totalQuantity = cart?.totalQuantity || 0;
  const totalPrice = cart?.totalPrice || 0;

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Items</span>

          <span className="font-semibold">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Quantity</span>

          <span className="font-semibold">{totalQuantity}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-red-500">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearItems}
        className="mt-8 w-full rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
      >
        Clear Cart
      </button>

      <Link
        to="/checkout"
        className="mt-4 block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-red-500"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
