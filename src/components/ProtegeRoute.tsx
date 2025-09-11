// src/components/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[]; // rôles autorisés
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // Non connecté → redirect login
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Connecté mais rôle non autorisé → redirect dashboard selon rôle
    const redirect = user.role === "admin" ? "/admin/dashboard" :
                     user.role === "enseignant" ? "/teacher/dashboard" :
                     "/eleve/dashboard";
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default PrivateRoute;