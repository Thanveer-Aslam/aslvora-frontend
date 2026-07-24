import api from "./api";

// Get Logged-in User Profile
export const getProfile = () => {
  return api.get("/users/profile");
};

// Update Profile
export const updateProfile = (profileData) => {
  return api.patch("/users/profile", profileData);
};
