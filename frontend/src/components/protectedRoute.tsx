import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  children?: ReactElement;
  redirect?: string;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated, children, redirect = "/login" }) => {
    if (!isAuthenticated) return <Navigate to={redirect}  />

    // return <Navigate to="/"  />
    return children ? children :<Outlet />;
};

export default ProtectedRoute;
