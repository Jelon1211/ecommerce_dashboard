import { createContext } from "react";

export const AuthStateContext = createContext(localStorage.getItem("token"));
