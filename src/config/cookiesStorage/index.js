"use client";

import nookies from "nookies";
import Cookies from "js-cookie";
import { namesCookies } from "@/config/constants/general";

// Token
export const setTokenCook = (accessToken) => {
  nookies.set(null, namesCookies.accessToken, accessToken);
};

export const getTokenCook = () => {
  // return nookies.get(null, namesCookies.accessToken)?.value;
  return Cookies.get(namesCookies.accessToken);
};

export const removeTokenCook = () => {
  nookies.destroy(null, namesCookies.accessToken);
};

// Lang
export const setLanguageCook = (lang) => {
  localStorage.setItem(namesCookies.lang, lang);
};

export const getLanguageCook = () => {
  return localStorage.getItem(namesCookies.lang);
};
