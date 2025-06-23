import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";

type User = {
  email: string;
  first_name: string;
  last_name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await api.post("/token/", { email, password });
    localStorage.setItem("access_token", response.data.access);
    // Fetch user profile
    const userResponse = await api.get("/users/me/");
    setUser(userResponse.data);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
