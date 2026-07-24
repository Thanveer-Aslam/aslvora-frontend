import api from "./api";

// Register
export const register = (data) => {
  return api.post("/auth/register", data);
};

// Login
export const login = (data) => {
  return api.post("/auth/login", data);
};

// Logout
export const logout = () => {
  return api.post("/auth/logout");
};
