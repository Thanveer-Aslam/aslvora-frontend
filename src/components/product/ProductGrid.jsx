import ProductCard from "../home/ProductCard";

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return (
      <div className="rounded-xl border py-20 text-center">
        <h2 className="text-2xl font-semibold">No Products Found</h2>

        <p className="mt-2 text-gray-500">Try changing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
