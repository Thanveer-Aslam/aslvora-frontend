import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import PersonalInformation from "../profile/PersonalInformation";

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInformation />;

      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Admin Profile"
        subtitle="Manage your personal information."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isAdmin={true}
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

export default AdminProfile;
