import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import authBanner from "../../assets/images/AuthBanner.png";
import { motion } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center gap-10 px-16 py-12">
        <h1 className="text-5xl font-bold tracking-wide">ASLVORA</h1>

        <p className="text-gray-500 text-sm tracking-wide uppercase">
          Timeless Fashion • Modern Lifestyle
        </p>

        <p className="text-gray-400 leading-8 text-lg max-w-lg">
          Discover premium clothing collections with a modern shopping
          experience. Shop the latest trends for Men, Women and Kids.
        </p>

        <div className="mt-16">
          <img
            src={authBanner}
            alt="Fashion Banner"
            className="w-full h-[300px] rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="bg-white shadow-2xl border border-gray-100 rounded-3xl w-full max-w-lg p-8 lg:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-gray-500 mt-2">
              {isLogin
                ? "Login to continue shopping."
                : "Create your account to start shopping."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>

          <div className="mt-8 text-center">
            {isLogin ? (
              <p className="text-gray-600">
                Don't have an account?
                <button
                  onClick={() => setIsLogin(false)}
                  className="ml-2 text-emerald-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?
                <button
                  onClick={() => setIsLogin(true)}
                  className="ml-2 text-emerald-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
