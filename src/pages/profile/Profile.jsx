import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

import ProfileSidebar from "../../components/profile/ProfileSidebar";

import PersonalInformation from "./PersonalInformation";
import MyAddresses from "./MyAddresses";
import MyOrders from "./MyOrders";
import Wishlist from "./Wishlist";

const Profile = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInformation />;

      case "addresses":
        return !isAdmin ? <MyAddresses /> : null;

      case "orders":
        return !isAdmin ? <MyOrders /> : null;

      case "wishlist":
        return !isAdmin ? <Wishlist /> : null;

      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={isAdmin ? "Admin Profile" : "My Account"}
        subtitle={
          isAdmin
            ? "Manage your personal information."
            : "Manage your profile, addresses, orders and wishlist."
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isAdmin={isAdmin}
          />
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          <Card>{renderContent()}</Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
