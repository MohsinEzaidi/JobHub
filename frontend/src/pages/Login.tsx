import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/contexts/NotificationContext";
import Navbar from "@/components/Navbar";
import axiosInstance from "@/api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axiosInstance.post("/login/", {
      email,
      password,
    });

    // Store user ID and tokens
    localStorage.setItem("user_id", response.data.user_id);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("isLoggedIn", "true");

    // Add authorization header to axios instance
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;

    addNotification("success", "Login Successful", "Welcome back!");
    navigate("/profile");
  } catch (error) {
    addNotification("error", "Login Failed", "Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">JobHub</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-6">
              Log In to Your Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 text-slate-300 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} JobHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
