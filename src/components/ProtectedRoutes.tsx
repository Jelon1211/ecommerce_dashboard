import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [authLogin, setAuthLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setAuthLogin(false);
    } else {
      setAuthLogin(true);
    }
  });
  if (!authLogin) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
