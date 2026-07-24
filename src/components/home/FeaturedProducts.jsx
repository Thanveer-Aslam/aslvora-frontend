import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { products, loading } = useProducts();

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      {/* Section Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Featured Products</h2>

          <p className="mt-2 text-gray-500">
            Explore our latest premium collections.
          </p>
        </div>

        <Link
          to="/products"
          className="flex items-center gap-2 font-medium text-red-500 hover:underline"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      ) : (
        <>
          {products?.length === 0 ? (
            <div className="rounded-2xl border border-dashed py-16 text-center">
              <h3 className="text-xl font-semibold">No Products Available</h3>

              <p className="mt-2 text-gray-500">
                Products will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedProducts;
