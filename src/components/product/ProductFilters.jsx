import { useCategories } from "../../hooks/useCategories";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductFilters = ({
  category,
  setCategory,

  brand,
  setBrand,

  size,
  setSize,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  sale,
  setSale,

  sort,
  setSort,
}) => {
  const { categories, loading } = useCategories();

  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setSize("");
    setMinPrice("");
    setMaxPrice("");
    setSale(false);
    setSort("newest");
  };

  console.log("Current category:", category);

  console.log(
    "Categories:",
    categories.map((item) => `"${item.name}"`),
  );

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">Category</label>

        <select
          value={
            categories.some(
              (item) =>
                item.name.trim().toLowerCase() ===
                category.trim().toLowerCase(),
            )
              ? categories.find(
                  (item) =>
                    item.name.trim().toLowerCase() ===
                    category.trim().toLowerCase(),
                )?.name
              : ""
          }
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">All Categories</option>

          {!loading &&
            categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-sm font-medium">Brand</label>

        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Search by brand"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Size */}
      <div>
        <label className="mb-2 block text-sm font-medium">Size</label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">All Sizes</option>

          {sizes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Min Price */}
      <div>
        <label className="mb-2 block text-sm font-medium">Minimum Price</label>

        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="₹0"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="mb-2 block text-sm font-medium">Maximum Price</label>

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="₹10000"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Sale */}
      <div className="flex items-center gap-3">
        <input
          id="sale"
          type="checkbox"
          checked={sale}
          onChange={(e) => setSale(e.target.checked)}
        />

        <label htmlFor="sale">On Sale Only</label>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-2 block text-sm font-medium">Sort By</label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilters;
