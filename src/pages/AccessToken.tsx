import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { LocationState } from "../models/AuthInterfaces";

const AccessToken = () => {
  const authService = new AuthService();
  const location = useLocation();

  const { accessToken } = location.state as LocationState;
  localStorage.setItem("token", accessToken);

  const gettingUserData = async () => {
    const userData = await authService.getUserData(accessToken);
    const {firstname, lastname, username} = userData
       localStorage.setItem("name", firstname);
        localStorage.setItem("email", username);
        localStorage.setItem("lastname", lastname);
  }

useEffect( ()=> {
  gettingUserData()
},[])

  if (accessToken === null) {
    return <Navigate to="/signin" replace />;
  } else {
    return <Navigate to="/ecommerce" replace />;
  }
};

export default AccessToken;
