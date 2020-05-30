import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}`;
const tokenKey = "token";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getUserDetails() {
  return http.get(`${apiEndpoint}/register/me`);
}

export function updateUserDetails(user) {
  return http.put(`${apiEndpoint}/register/me`, user);
}

export async function registerUser(user) {
  const response = await http.post(`${apiEndpoint}/register`, user);

  localStorage.setItem("token", response.headers["x-auth-token"]);
}

export function resetPassword(user) {
  return http.put(`${apiEndpoint}/forgot-password`, user);
}

export async function login(user) {
  const response = await http.post(`${apiEndpoint}/auth`, user);

  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
