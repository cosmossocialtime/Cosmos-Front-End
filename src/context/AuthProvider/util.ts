import { api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) return null;

  const user = JSON.parse(json);
  return user ?? null;
}
export function setTokenUser(accessToken?: IUser | null) {
  localStorage.setItem("a", JSON.stringify(accessToken));
}

export function getTokenUser() {
  const json = localStorage.getItem("a");

  if (!json) return null;
  const accessToken = JSON.parse(json);
  return accessToken ?? null;
}
export function getRefreshTokenUser() {
  const json = localStorage.getItem("r");

  if (!json) return null;
  const refreshToken = JSON.parse(json);
  return refreshToken ?? null;
}

export function setRefreshTokenUser(refreshToken?: IUser | null) {
  localStorage.setItem("r", JSON.stringify(refreshToken));
}

export async function loginRequest(email: string, password: string) {
  try {
    const request = await api.post("auth/signin", { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}
