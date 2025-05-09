import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

interface Props {
  children: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const userRole = useSelector((state: RootState) => state.auth.userInfo?.role);

  if (userRole !== requiredRole) {
    return <Navigate to="/pizzalist" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
