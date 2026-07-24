import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (
        response.user.role === "ADMIN" &&
        response.paymentSetup &&
        !response.paymentSetup.configured &&
        !sessionStorage.getItem("payment-setup-toast")
      ) {
        toast.warning(
          "Online payments are disabled because Razorpay credentials haven't been configured.",
          {
            duration: 10000,
            action: {
              label: "Open Settings",
              onClick: () => navigate("/admin/settings#payment"),
            },
          },
        );

        sessionStorage.setItem("payment-setup-toast", "true");
      }

      if (response.user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}

      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>

        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-gray-300 px-4 py-3.5"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isLoading}
        className="w-full bg-emerald-600 text-white py-3 rounded-xl"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
