import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children }) {
  const { loginData } = useContext(AuthContext);
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/login" />;
}
