import React, { createContext, useState, useContext, ReactNode } from "react";
import { login, register } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    await register(username, email, password);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, register: handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
