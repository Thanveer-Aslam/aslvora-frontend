import { User, MapPin, Package, Heart, LogOut } from "lucide-react";

import Card from "../common/Card";
import ProfileMenuItem from "./ProfileMenuItem";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProfileSidebar = ({ activeTab, setActiveTab, isAdmin = false }) => {
  const menus = isAdmin
    ? [
        {
          id: "personal",
          label: "Personal Information",
          icon: User,
        },
      ]
    : [
        {
          id: "personal",
          label: "Personal Information",
          icon: User,
        },
        {
          id: "addresses",
          label: "My Addresses",
          icon: MapPin,
        },
        {
          id: "orders",
          label: "My Orders",
          icon: Package,
        },
        {
          id: "wishlist",
          label: "Wishlist",
          icon: Heart,
        },
      ];

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };

  return (
    <Card className="sticky top-24">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        {isAdmin ? "Admin Profile" : "My Account"}
      </h2>

      <div className="space-y-2">
        {menus.map((menu) => (
          <ProfileMenuItem
            key={menu.id}
            icon={menu.icon}
            label={menu.label}
            active={activeTab === menu.id}
            onClick={() => setActiveTab(menu.id)}
          />
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <ProfileMenuItem
          icon={LogOut}
          label="Logout"
          onClick={handleLogout}
          danger
        />
      </div>
    </Card>
  );
};

export default ProfileSidebar;
