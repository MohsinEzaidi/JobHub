import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar, Edit, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axiosInstance from "@/api/axios";

// Define activity types
type ActivityType = "saved" | "applied" | "searched";
interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    joinDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tempName, setTempName] = useState(user.name);
  const [tempEmail, setTempEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(true);

  // Get initials for avatar
  const getInitials = (name?: string) => {
    if (!name) return "JD"; // Default initials if name is undefined
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("No access token found");
        }

        // Make request with authorization header
        const response = await axiosInstance.get("/api/users/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        const fullName = `${userData.first_name} ${userData.last_name}`;

        // Create user object with backend data
        const backendUser = {
          name: fullName,
          email: userData.email,
          joinDate: new Date(userData.date_joined).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
        };

        // Set state with backend data
        setUser(backendUser);
        setTempName(fullName);
        setTempEmail(userData.email);

        // Update localStorage with backend data
        localStorage.setItem("userData", JSON.stringify(backendUser));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const hasToken = localStorage.getItem("access_token");

    if (!isLoggedIn || !hasToken) {
      navigate("/login");
      return;
    }

    // REMOVED: Loading user data from localStorage
    // Only fetch from backend

    fetchUserData();

    // Load activities from localStorage
    const savedActivities = localStorage.getItem("userActivities");
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      // Default activities
      setActivities([
        {
          id: "1",
          type: "saved",
          title: "Saved Frontend Developer at StartupXYZ",
          date: "5 days ago",
        },
        {
          id: "2",
          type: "searched",
          title: 'Searched for "React Developer" jobs',
          date: "3 days ago",
        },
        {
          id: "3",
          type: "applied",
          title: "Applied to Software Engineer at Tech Corp",
          date: "2 days ago",
        },
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name: tempName,
      email: tempEmail,
    };

    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setIsEditing(false);

    // Add profile update activity
    const newActivity = {
      id: Date.now().toString(),
      type: "saved" as ActivityType,
      title: "Updated profile information",
      date: "Just now",
    };

    const updatedActivities = [newActivity, ...activities.slice(0, 2)];
    setActivities(updatedActivities);
    localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
  };

  const addActivity = (type: ActivityType, title: string) => {
    const newActivity = {
      id: Date.now().toString(),
      type,
      title,
      date: "Just now",
    };

    const updatedActivities = [newActivity, ...activities.slice(0, 2)];
    setActivities(updatedActivities);
    localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your JobNest account</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Info Card */}
            <Card className="animate-fade-in-up hover-scale">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 bg-blue-100 border-2 border-blue-200">
                    <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        Member since {user.joinDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Job Seeker</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card
              className="animate-fade-in-up hover-scale"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/saved-jobs")}
                    >
                      Saved Jobs
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          activity.type === "saved"
                            ? "bg-blue-100 text-blue-800"
                            : activity.type === "applied"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.type === "saved"
                          ? "Saved"
                          : activity.type === "applied"
                          ? "Applied"
                          : "Searched"}
                      </span>
                    </div>
                  ))
                )}

                {/* Add Test Activity Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addActivity(
                        "saved",
                        "Saved Full Stack Developer at TechCorp"
                      )
                    }
                  >
                    Add Save Activity
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addActivity(
                        "applied",
                        "Applied to Senior Product Manager role"
                      )
                    }
                  >
                    Add Apply Activity
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addActivity(
                        "searched",
                        'Searched for "Remote Marketing Jobs"'
                      )
                    }
                  >
                    Add Search Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
