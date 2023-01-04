import API from "@/core/axios";
import { pathBackAuth } from "@/core/constants/urlBack";
import { useAuthStore } from "@/storeZustand/auth/store";
import { setTokenCook } from "@/core/cookiesStorage";

export const AuthService = {
  async postLogin(options) {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...options.data,
      });

      useAuthStore.getState().setLoginSingInAction(options.data.login);

      options.cb && options.cb(response.data.verificationCode);

      useAuthStore
        .getState()
        .setVerificationCodeAction(response.data.verificationCode);

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  },
  async postVerification(options) {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...options.data,
      });

      setTokenCook(response.data.accessToken);

      useAuthStore.getState().setAuthHeadersAction(response.data);
      useAuthStore.getState().authTokenAction({
        token: response.data.accessToken,
      });

      options.cb && options.cb();

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  },
  async postSingUp(options) {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...options.data,
      });

      AuthService.postLoginRequest({
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
};
