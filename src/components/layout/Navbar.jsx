import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { customerNavLinks } from "../../constants/navigation";
import useWishlist from "../../hooks/useWishlist";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Men", path: "/products?category=men" },
  { name: "Women", path: "/products?category=women" },
  { name: "Kids", path: "/products?category=kids" },
  { name: "Sale", path: "/products?sale=true" },
  { name: "New Arrivals", path: "/products?sort=new" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();

  const { logout, user } = useAuth();
  const { cart } = useCart();
  const { count: wishlistCount } = useWishlist();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    
  const cartCount = cart?.items?.length || 0;
  
  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ASLVORA<span className="text-red-500">.</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 px-10 lg:block">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden items-center gap-5 lg:flex">
            <Link to="/wishlist" className="relative">
              <Heart className="hover:text-red-500 transition" />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingBag className="hover:text-red-500" />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <User />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-xl border bg-white shadow-xl">
                  <div className="border-b p-4">
                    <p className="font-semibold">{user?.fullName}</p>

                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden h-12 items-center gap-8 lg:flex">
          {customerNavLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="space-y-4 border-t py-5 lg:hidden">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block"
              >
                {item.name}
              </NavLink>
            ))}

            <div className="flex gap-6 pt-2">
              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="relative"
              >
                <Heart />

                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative"
              >
                <ShoppingBag />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/profile" onClick={() => setOpen(false)}>
                <User />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
