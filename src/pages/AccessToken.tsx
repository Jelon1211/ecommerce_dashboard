import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { LocationState } from "../models/AuthInterfaces";

const AccessToken = () => {
  const authService = new AuthService();
  const location = useLocation();

  const { accessToken, username } = location.state as LocationState;
  localStorage.setItem("token", accessToken);

  const gettingUserData = async () => {
    const userData = await authService.getUserData(username);
       localStorage.setItem("name", userData.firstname);
        localStorage.setItem("email", userData.username);
        localStorage.setItem("lastname", userData.lastname);
    console.log(userData);
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
