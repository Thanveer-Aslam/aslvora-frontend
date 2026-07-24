import { Search } from "lucide-react";

const ProductSearch = ({ search, setSearch }) => {
  return (
    <div className="relative mb-8">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-red-500"
      />
    </div>
  );
};

export default ProductSearch;
