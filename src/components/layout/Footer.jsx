import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-3xl font-bold">
            ASLVORA<span className="text-red-500">.</span>
          </h2>

          <p className="mt-4 text-sm text-gray-400">
            Discover premium fashion for Men, Women & Kids.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Shop</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Company</h3>

          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Subscribe</h3>

          <div className="flex">
            <input
              placeholder="Email"
              className="w-full rounded-l-lg px-3 py-2 text-black outline-none"
            />

            <button className="rounded-r-lg bg-red-500 px-4">
              <Mail size={18} />
            </button>
          </div>

          <div className="mt-6 flex gap-4 text-gray-400">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>X</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ASLVORA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
