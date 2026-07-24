import { useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import useWishlist from "../../hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, loading, fetchWishlist, removeFromWishlist } =
    useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <p className="text-lg text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <Heart size={70} className="mb-6 text-red-500" />

        <h2 className="text-3xl font-bold">Your Wishlist is Empty</h2>

        <p className="mt-3 max-w-md text-gray-500">
          Save your favourite products so you can find them easily later.
        </p>

        <Link
          to="/products"
          className="mt-8 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-red-500"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex items-center gap-3">
        <Heart className="fill-red-500 text-red-500" size={28} />

        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>

          <p className="text-gray-500">
            {wishlist.length} product{wishlist.length > 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => {
          const product = item.product;

          const image =
            product?.images?.find((img) => img.isPrimary)?.url ||
            product?.images?.[0]?.url ||
            "https://placehold.co/600x800?text=No+Image";

          const discountedPrice =
            product.discount > 0
              ? product.price - (product.price * product.discount) / 100
              : product.price;

          return (
            <div
              key={product._id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={image}
                  alt={product.name}
                  className="h-72 w-full object-cover"
                />
              </Link>

              <div className="p-5">
                <p className="text-sm text-gray-500">{product.brand}</p>

                <Link
                  to={`/products/${product._id}`}
                  className="mt-1 block text-lg font-semibold hover:text-red-500"
                >
                  {product.name}
                </Link>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-red-500">
                    ₹{discountedPrice.toLocaleString()}
                  </span>

                  {product.discount > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 rounded-lg bg-black py-2 text-center text-sm font-medium text-white transition hover:bg-red-500"
                  >
                    View Product
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="rounded-lg border border-red-500 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Wishlist;
