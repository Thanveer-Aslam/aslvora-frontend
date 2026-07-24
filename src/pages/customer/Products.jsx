import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

import ProductSearch from "../../components/product/ProductSearch";
import ProductFilters from "../../components/product/ProductFilters";
import ProductGrid from "../../components/product/ProductGrid";

const Products = () => {
  const { products, loading, fetchProducts } = useProducts();

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sale, setSale] = useState(false);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    console.log("URL:", window.location.href);
    console.log("category:", searchParams.get("category"));

    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setBrand(searchParams.get("brand") || "");
    setSize(searchParams.get("size") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSale(searchParams.get("sale") === "true");
    setSort(searchParams.get("sort") || "newest");
  }, [searchParams]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({
        search,
        category,
        brand,
        size,
        minPrice,
        maxPrice,
        sale,
        sort,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    search,
    category,
    brand,
    size,
    minPrice,
    maxPrice,
    sale,
    sort,
    fetchProducts,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">All Products</h1>

      <ProductSearch search={search} setSearch={setSearch} />

      <div className="grid gap-8 lg:grid-cols-4">
        <div>
          <ProductFilters
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            size={size}
            setSize={setSize}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sale={sale}
            setSale={setSale}
            sort={sort}
            setSort={setSort}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center">Loading...</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
