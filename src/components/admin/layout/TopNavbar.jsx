import { Menu, Search, Bell, ChevronDown, LogOut, User } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

const TopNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

          <p className="text-sm text-gray-500">Welcome back, Admin</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-red-500"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-lg p-2 transition hover:bg-gray-100">
          <Bell size={22} />

          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 transition hover:bg-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-semibold text-white">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold">{user?.fullName}</p>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <ChevronDown size={18} className="hidden text-gray-500 lg:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl border bg-white shadow-xl">
              <div className="border-b p-4">
                <p className="font-semibold">{user?.fullName}</p>

                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/admin/profile");
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100"
              >
                <User size={18} />
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
    </header>
  );
};

export default TopNavbar;
