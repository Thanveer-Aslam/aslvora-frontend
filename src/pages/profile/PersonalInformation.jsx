import { useEffect } from "react";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";

import useProfile from "../../hooks/useProfile";
import useAuth from "../../hooks/useAuth";

const PersonalInformation = () => {
  const { user } = useAuth();

  const { profile, loading, fetchProfile, updateProfile } = useProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (data) => {
    await updateProfile(data);
  };

  return (
    <div className="space-y-6">
      <ProfileHeader
        user={profile || user}
        onEdit={() => {
          document.getElementById("personal-info-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      />

      <div id="personal-info-form">
        <PersonalInfoForm
          user={profile || user}
          loading={loading}
          onSubmit={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
