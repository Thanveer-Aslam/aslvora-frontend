import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
        <ShoppingCart size={60} className="text-gray-400" />
      </div>

      <h1 className="mt-8 text-4xl font-bold text-gray-900">
        Your Cart is Empty
      </h1>

      <p className="mt-4 max-w-md text-lg text-gray-500">
        Looks like you haven't added any products to your cart yet. Browse our
        latest collection and find something you'll love.
      </p>

      <Link
        to="/products"
        className="mt-10 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-red-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
