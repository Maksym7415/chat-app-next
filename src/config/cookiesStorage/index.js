// "use client";
import nookies from "nookies";

export const namesCookies = {
  accessToken: "accessToken",
  lang: "@@lang",
};

// Token
export const setTokenCook = (accessToken) => {
  nookies.set(null, namesCookies.accessToken, accessToken);
};

export const getTokenCook = () => {
  return nookies.set(null, namesCookies.accessToken)?.value;
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
