import { NavLink, useNavigate } from "react-router-dom";

const SidebarItem = ({ title, path, icon: Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-red-500 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-red-500"
        }`
      }
    >
      <Icon size={20} />
      <span>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
