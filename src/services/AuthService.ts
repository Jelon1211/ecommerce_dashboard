import axios, { AxiosError } from "axios";
import { LoginResponse, UserData } from "../models/AuthInterfaces";

export class AuthService {
  host = `${process.env.REACT_APP_ADRESS}`;

  public async login(email: string, password: string) {
    return (
      // await axios.post<LoginResponse>(`${this.host}/app/auth/login`, {
      (
        await axios.post<LoginResponse>(`${this.host}/auth`, {
          password: password,
          username: email,
        })
      ).data
    );
  }

  public register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const result = axios
      .post(`${this.host}/users`, {
        firstname: firstName,
        lastname: lastName,
        username: email,
        password: password,
      })
      .then((response) => {
        return response;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    return result;
  }

  public async getUserDataToken(token: string) {
    return (
      await axios.get<UserData>(`${this.host}/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  }

  public async getUserData(username: string) {
    return (
      await axios.post<UserData>(`${this.host}/auth/user`, {
        username: username,
      })
    ).data;
  }
}
