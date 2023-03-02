import Cookies from "js-cookie";
import { namesCookies } from "@/core/constants/general";

// Token
export const setTokenCook = (accessToken) => {
  Cookies.set(namesCookies.accessToken, accessToken);
};

export const getTokenCook = () => {
  return Cookies.get(namesCookies.accessToken);
};

export const removeTokenCook = () => {
  Cookies.remove(namesCookies.accessToken);
};
