import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/contexts/NotificationContext";
import Navbar from "@/components/Navbar";
import axiosInstance from "@/api/axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (password !== confirmPassword) {
      addNotification("error", "Password Error", "Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      addNotification("error", "Password Error", "Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      
      // Send registration request to backend
      const response = await axiosInstance.post("register/", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      // If successful, show notification and redirect
      addNotification(
        "success", 
        "Account Created", 
        "Your account has been created successfully"
      );
      
      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
      
    } catch (error: any) {
      // Handle different error cases
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response) {
        // Backend returned an error response
        if (error.response.data.email) {
          errorMessage = error.response.data.email[0];
        } else if (error.response.data.password) {
          errorMessage = error.response.data.password[0];
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      addNotification("error", "Registration Failed", errorMessage);
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
            <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password (min 8 characters)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                    minLength={8}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Log In
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

export default SignUp;