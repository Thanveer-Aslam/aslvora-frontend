import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-100 to-white px-8 py-12 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
            NEW COLLECTION
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            SUMMER <br />
            <span className="text-red-500">2026</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Discover premium fashion for Men, Women & Kids.
            <br />
            Get up to <span className="font-bold">30% OFF</span> on selected
            collections.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products?sale=true"
              className="rounded-xl border border-black px-6 py-3 font-semibold transition hover:bg-black hover:text-white"
            >
              Explore Sale
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900"
            alt="Fashion"
            className="h-[500px] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
