import { NavLink } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { adminNavLinks } from "../../../constants/navigation";
import SidebarItem from "./SidebarItem";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
     const navigate = useNavigate();

     const { logout } = useAuth();

     const handleLogout = async () => {
       await logout();
       navigate("/auth", { replace: true });
     };
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white shadow-sm lg:block">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
        <h1 className="text-2xl font-bold tracking-tight">
          ASLVORA<span className="text-red-500">.</span>
        </h1>

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <Menu size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex h-[calc(100%-64px)] flex-col justify-between p-4">
        <div className="space-y-2">
          {adminNavLinks.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
