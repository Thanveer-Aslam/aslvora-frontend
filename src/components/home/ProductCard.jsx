import { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useWishlist from "../../hooks/useWishlist";
import useAuthStore from "../../store/authStore";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStore();

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const image =
    product?.images?.find((img) => img.isPrimary)?.url ||
    product?.images?.[0]?.url ||
    "https://placehold.co/600x800?text=No+Image";

  const discountPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlistLoading) return;

    if (!isAuthenticated) {
      toast.warning("Please login to add products to your wishlist.");
      navigate("/auth");
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/products/${product._id}`} className="block">
          <img
            src={image}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}
        </Link>

        {/* Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="rounded-full bg-white p-2 shadow transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={
              isWishlisted(product._id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <Heart
              size={18}
              className={
                isWishlisted(product._id) ? "fill-red-500 text-red-500" : ""
              }
            />
          </button>

          <Link
            to={`/products/${product._id}`}
            className="rounded-full bg-white p-2 shadow transition hover:bg-black hover:text-white"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <p className="text-sm text-gray-500">{product.brand}</p>

        <Link
          to={`/products/${product._id}`}
          className="mt-1 block line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-red-500"
        >
          {product.name}
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-bold text-red-500">
            ₹{discountPrice.toLocaleString()}
          </span>

          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              product.stockQuantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>

          <Link
            to={`/products/${product._id}`}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
          >
            Add
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
