import create from "zustand";
import { devtools } from "zustand/middleware";
import { jwtdecode } from "@/helpers/jwtdecode";
import API from "@/core/axios";
import { pathBackAuth } from "@/core/constants/urlBack";
import { setTokenCook } from "@/core/cookiesStorage";

const initialAuthToken = {
  role: "",
  login: "",
  userAgent: "",
  firstName: "",
  userId: 0,
  type: "",
  iat: 0,
  exp: 0,
};

const initialState = {
  loginSingIn: null,
  verificationCode: null,
  authToken: initialAuthToken,
  headers: { accessToken: "" },
};

export const useAuthStore = create((set, get) => ({
  // STATES
  ...initialState,

  // ACTIONS
  authTokenAction: (data) => {
    let payloadLocal = initialAuthToken;
    try {
      payloadLocal = data ? jwtdecode(data) : payloadLocal;
    } catch (e) {}

    set({ authToken: payloadLocal });
  },
  setAuthHeadersAction: (data) => {
    set({ headers: { ...get().headers, ...data } });
  },
  setLoginSingInAction: (data) => {
    set({ loginSingIn: data });
  },
  setVerificationCodeAction: (data) => {
    set({ verificationCode: data });
  },
}));
