import { useNavigate } from "react-router-dom";
const TopProducts = ({ dashboard }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Top Selling Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Best-performing products this month
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products")}
          className="text-sm font-semibold text-red-500 transition hover:text-red-600"
        >
          View All
        </button>
      </div>

      {/* Products */}
      <div className="dashboard-scroll max-h-[420px] space-y-4 overflow-y-auto pr-2">
        {dashboard?.topProducts?.length > 0 ? (
          dashboard.topProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image || "https://placehold.co/60x60?text=P"}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg border object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>

              <div className="hidden text-center md:block">
                <p className="text-xs text-gray-500">Price</p>

                <p className="font-semibold text-gray-900">₹{product.price}</p>
              </div>

              <div className="hidden text-center md:block">
                <p className="text-xs text-gray-500">Stock</p>

                <p className="font-semibold text-gray-900">{product.stock}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">Sold</p>

                <p className="font-bold text-red-500">{product.sold}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No top-selling products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
