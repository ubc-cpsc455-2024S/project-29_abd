import React from "react";
import { useAuth } from "@/contexts/authcontext";
import Login from "@/login";

const AuthCheck: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthCheck;
