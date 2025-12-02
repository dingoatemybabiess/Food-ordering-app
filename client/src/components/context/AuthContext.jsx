import React, { createContext, useState, useEffect } from "react"; 
import api from "../services/api"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Always fetch from backend to get latest profile
          const response = await api.get("/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data && response.data.user) {
            setUser(response.data.user); // <- this must be fresh from DB
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error("Invalid token or failed to fetch profile", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);
  
  

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      // Decode token to get user info
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser({ token, ...decoded });

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || "Login failed.";
      return { success: false, message: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ token, ...decoded });
      }
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || "Registration failed.";
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
