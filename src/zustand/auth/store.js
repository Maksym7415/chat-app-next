import create from "zustand";
import { devtools } from "zustand/middleware";
import { jwtdecode } from "@/helpers/jwtdecode";
import API from "@/config/axios";
import { pathBackAuth } from "@/config/constants/urlBack";
import { setTokenCook } from "@/config/cookiesStorage";

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

  // REQUEST
  postLoginRequest: async (options) => {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...options.data,
      });

      get().setLoginSingInAction(options.data.login);

      options.cb && options.cb(response.data.verificationCode);

      set({ verificationCode: response.data.verificationCode });

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  },

  postVerificationRequest: async (options) => {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...options.data,
      });

      setTokenCook(response.data.accessToken);

      get().setAuthHeadersAction(response.data);

      get().authTokenAction({
        token: response.data.accessToken,
      });

      options.cb && options.cb();

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  },

  postSingUpRequest: async (options) => {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...options.data,
      });

      get().postLoginRequest({
        data: {
          login: options.data.login,
        },
        cb: options.cb(),
      });

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  },
}));
