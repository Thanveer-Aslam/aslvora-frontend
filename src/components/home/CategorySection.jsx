import { Link } from "react-router-dom";
import { Shirt, ShoppingBag, Baby, Gem } from "lucide-react";

const categories = [
  {
    name: "Men",
    icon: Shirt,
    color: "bg-blue-50",
    path: "/products?category=men",
  },
  {
    name: "Women",
    icon: ShoppingBag,
    color: "bg-pink-50",
    path: "/products?category=women",
  },
  {
    name: "Kids",
    icon: Baby,
    color: "bg-yellow-50",
    path: "/products?category=kids",
  },
  {
    name: "Accessories",
    icon: Gem,
    color: "bg-green-50",
    path: "/products?category=accessories",
  },
];

const CategorySection = () => {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Shop By Category</h2>

          <p className="mt-2 text-gray-500">
            Explore our latest fashion collections.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              to={category.path}
              className={`${category.color}
                group rounded-2xl border p-8 transition-all duration-300
                hover:-translate-y-2 hover:border-red-500 hover:shadow-xl`}
            >
              <div className="mb-5 inline-flex rounded-full bg-white p-4 shadow">
                <Icon
                  size={34}
                  className="text-gray-800 transition group-hover:text-red-500"
                />
              </div>

              <h3 className="text-xl font-semibold">{category.name}</h3>

              <p className="mt-2 text-sm text-gray-500">Premium Collection</p>

              <div className="mt-6 font-medium text-red-500">Shop Now →</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
