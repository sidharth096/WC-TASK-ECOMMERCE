"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { login, register, logout } from "@/store/authSlice";
import {
  X,
  User,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserIcon,
  Shield,
  Settings,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "profile";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  // State for form mode (login, signup, or profile)
  const [mode, setMode] = useState<"login" | "signup" | "profile">(
    user ? "profile" : initialMode
  );

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Form validation state
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", password: "" });
      setValidationErrors({ name: "", email: "", password: "" });
      setShowPassword(false);
      if (user) {
        setMode("profile");
      }
    }
  }, [isOpen, user]);

  // Handle form input changes with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = { name: "", email: "", password: "" };
    let isValid = true;

    if (mode === "signup" && !formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (mode === "signup" && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === "login") {
        await dispatch(
          login({ email: formData.email, password: formData.password })
        ).unwrap();
        toast.success("Welcome back! Logged in successfully!", {
          position: "top-right",
          icon: "🎉",
        });
        setMode("profile");
        onClose();
      } else if (mode === "signup") {
        await dispatch(
          register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();
        toast.success("Welcome! Account created successfully!", {
          position: "top-right",
          icon: "🚀",
        });
        setMode("profile");
        onClose();
      }
      setFormData({ name: "", email: "", password: "" });
    } catch (err: unknown) {
      const errorPayload = err as { error: string };
      const errorMessage =
        errorPayload.error || error || "Something went wrong. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!", {
      position: "top-right",
      icon: "👋",
    });
    setMode("login");
    onClose();
  };

  // Handle mode switch
  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    setFormData({ name: "", email: "", password: "" });
    setValidationErrors({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] min-h-screen overflow-y-auto p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 m-4 sm:m-6 relative transform transition-all duration-300 animate-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {mode === "profile" && user ? (
          /* Profile View */
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Account Active
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  Account Settings
                </span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">My Wishlist</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Login/Signup Form */
          <div>
            {/* Header with Mode Toggle */}
            <div className="text-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => switchMode("login")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    mode === "login"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => switchMode("signup")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    mode === "signup"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {mode === "login" ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {mode === "login"
                  ? "Sign in to access your account"
                  : "Join us and start shopping today"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                        validationErrors.name
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                      validationErrors.email
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                      validationErrors.password
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      mode === "login"
                        ? "Enter your password"
                        : "Create a password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.password}
                  </p>
                )}
                {mode === "signup" && (
                  <p className="text-gray-500 text-sm mt-1">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md ${
                  loading ? "opacity-50 cursor-not-allowed transform-none" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              {mode === "login" ? (
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => switchMode("login")}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Shield className="w-3 h-3 mr-1" />
                Your data is secure and encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;