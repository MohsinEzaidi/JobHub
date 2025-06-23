import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Calendar, Edit, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axiosInstance from "@/api/axios";

// Types
type ActivityType = "saved" | "applied" | "searched";
interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
}
interface BackendUser {
  nom: string;
  prenom: string;
  email: string;
  date_joined: string;
}

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    joinDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tempNom, setTempNom] = useState(user.nom);
  const [tempPrenom, setTempPrenom] = useState(user.prenom);
  const [tempEmail, setTempEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(true);

const getInitials = () => {
  return `${user.prenom?.[0] || ""}${user.nom?.[0] || ""}`.toUpperCase();
};


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("profile/");
        const userData: BackendUser = response.data;
        console.log(userData)

        const formattedUser = {
          nom: userData.last_name,
          prenom: userData.first_name,
          email: userData.email,
          joinDate: new Date(userData.date_joined).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
        };

        setUser(formattedUser);
        setTempNom(userData.nom);
        setTempPrenom(userData.prenom);
        setTempEmail(userData.email);
        localStorage.setItem("userData", JSON.stringify(formattedUser));
      } catch (error: any) {
        console.error("Erreur chargement profil :", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetchUserData();

    const savedActivities = localStorage.getItem("userActivities");
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
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
          title: 'Searched for "React Developer"',
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
    localStorage.clear();
    navigate("/");
  };

  const handleSaveProfile = () => {
    const updated = {
      ...user,
      nom: tempNom,
      prenom: tempPrenom,
      email: tempEmail,
    };
    setUser(updated);
    localStorage.setItem("userData", JSON.stringify(updated));
    setIsEditing(false);
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: "saved",
      title: "Profil mis à jour",
      date: "À l’instant",
    };
    const updatedActivities = [newActivity, ...activities.slice(0, 2)];
    setActivities(updatedActivities);
    localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
  };

  const addActivity = (type: ActivityType, title: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      title,
      date: "À l’instant",
    };
    const updatedActivities = [newActivity, ...activities.slice(0, 2)];
    setActivities(updatedActivities);
    localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
  };

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mon Profil</h1>
            <p className="text-gray-600">Gérer mon compte JobNest</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Info */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 bg-blue-100 border-2 border-blue-200">
                    <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">
                  {user.prenom} {user.nom}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm">Nom</label>
                      <input
                        type="text"
                        value={tempNom}
                        onChange={(e) => setTempNom(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Prénom</label>
                      <input
                        type="text"
                        value={tempPrenom}
                        onChange={(e) => setTempPrenom(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Email</label>
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Membre depuis {user.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>Job Seeker</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="w-full bg-green-600 text-white">
                      Enregistrer
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier le profil
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/saved-jobs")}>
                      Voir favoris
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center">Aucune activité récente</p>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-2 bg-gray-100 my-1 rounded">
                    <div>
                      <p className="font-medium">{act.title}</p>
                      <p className="text-sm text-gray-500">{act.date}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      act.type === "saved" ? "bg-blue-100 text-blue-800"
                        : act.type === "applied" ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {act.type}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
