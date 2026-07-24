import { create } from "zustand";

const useProfileStore = create((set) => ({
  // State
  profile: null,
  loading: false,

  // Loading
  setLoading: (loading) =>
    set({
      loading,
    }),

  // Set Profile
  setProfile: (profile) =>
    set({
      profile,
      loading: false,
    }),

  // Update Profile
  updateProfile: (updatedData) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...updatedData,
      },
    })),

  // Clear Profile
  clearProfile: () =>
    set({
      profile: null,
      loading: false,
    }),
}));

export default useProfileStore;
