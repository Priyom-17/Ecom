// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};
