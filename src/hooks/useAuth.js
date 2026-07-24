import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../services/auth.service";
import useAuthStore from "../store/authStore";

const useAuth = () => {
  const { login, logout, setLoading, isLoading, user, token, isAuthenticated } =
    useAuthStore();

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);

      const { data } = await loginApi(credentials);

      login(data.user, data.token);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setLoading(true);

      const payload = {
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
      };

      const { data } = await registerApi(payload);

      login(data.user, data.token);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      logout();
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};

export default useAuth;
