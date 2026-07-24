import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),

    email: z.string().email("Invalid email"),

    phoneNumber: z.string().min(10, "Phone number is required"),

    password: z.string().min(6, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    terms: z.boolean().refine((val) => val, {
      message: "Accept Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      delete data.terms;

      const response = await registerUser(data);

      if (response.user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="w-full rounded-xl border px-4 py-3"
      />
      <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

      <input
        {...register("email")}
        placeholder="Email"
        className="w-full rounded-xl border px-4 py-3"
      />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <input
        {...register("phoneNumber")}
        placeholder="Phone Number"
        className="w-full rounded-xl border px-4 py-3"
      />
      <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>

      <div className="relative">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full rounded-xl border px-4 py-3 pr-12"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <div className="relative">
        <input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full rounded-xl border px-4 py-3 pr-12"
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("terms")} />I agree to Terms &
        Conditions
      </label>

      <p className="text-red-500 text-sm">{errors.terms?.message}</p>

      <button
        disabled={isLoading}
        className="w-full bg-emerald-600 text-white py-3 rounded-xl"
      >
        {isLoading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
