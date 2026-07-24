import { toast } from "sonner";

import {
  getProfile as getProfileApi,
  updateProfile as updateProfileApi,
} from "../services/profile.service";

import useProfileStore from "../store/profileStore";
import useAuthStore from "../store/authStore";

const useProfile = () => {
  const {
    profile,
    loading,
    setLoading,
    setProfile,
    updateProfile: updateProfileStore,
    clearProfile,
  } = useProfileStore();

  const { user, setUser } = useAuthStore();

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await getProfileApi();

      setProfile(data.user);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);

      const { data } = await updateProfileApi(profileData);

      // Update Profile Store
      updateProfileStore(data.user);

      // Update Auth Store
      setUser(data.user);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    clearProfile,
    user,
  };
};

export default useProfile;
