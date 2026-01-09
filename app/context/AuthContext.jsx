"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    setTimeout(loadUser, 0);
  }, []);


  const login = async (email, password) => {
    if (password === "admin123" || password === "editor123") {
      const role = password === "admin123" ? "Admin" : "Editor";

      const loggedInUser = { email, role };
      setUser(loggedInUser);

      sessionStorage.setItem("user", JSON.stringify(loggedInUser));

      return true;
    }

    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/admin/login");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    email: user?.email || null,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
