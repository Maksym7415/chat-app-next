import Cookies from "js-cookie";
import { namesCookies } from "@/core/constants/general";

// Token
export const setTokenCook = (accessToken, options = {}) => {
  Cookies.set(namesCookies.accessToken, accessToken, options);
};

export const getTokenCook = () => Cookies.get(namesCookies.accessToken);

export const removeTokenCook = () => {
  Cookies.remove(namesCookies.accessToken);
};


export const setUserInfoTokenCook = (userInfoToken, options = {}) => {
  Cookies.set(namesCookies.userInfoToken, JSON.stringify(userInfoToken), options);
};

export const getUserInfoTokenCook = () => {
  const getValue = Cookies.get(namesCookies.userInfoToken);
  return getValue ? JSON.parse(getValue) : null;
};

export const removeUserInfoTokenCook = () => {
  Cookies.remove(namesCookies.userInfoToken);
};



