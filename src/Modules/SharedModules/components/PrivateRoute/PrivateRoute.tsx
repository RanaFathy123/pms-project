import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function PrivateRoute({ children }: any) {
  const { loginData } = useContext(AuthContext);
  if (localStorage.getItem("token") || loginData)
    return <Navigate to="/dashboard" />;
  else return children;
}
