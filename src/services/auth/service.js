import { useMutation } from "react-query";
import { pathBackAuth } from "@/core/constants/urlBack";
import { useAuthStore } from "@/storeZustand/auth/store";
import { postFetcher } from "../fetchers";
import { setTokenCook } from "@/core/cookiesStorage";

export const PostLoginQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [`post_${pathBackAuth.signIn}`],
    mutationFn: async ({ data }) => {
      useAuthStore.getState().setLoginSingInAction(data.login);

      return await postFetcher({ url: pathBackAuth.signIn, data });
    },
    retry: 0,
    onSuccess(response) {
      if (response?.data) {
        options.cb && options.cb(response?.data);

        useAuthStore
          .getState()
          .setVerificationCodeAction(response.data.verificationCode);
      }
    },
    onError(error) {
      options.errorCb && options.errorCb(error?.data);
    },
  });

  return queryData;
};

export const PostVerificationQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [`post_${pathBackAuth.checkVerificationCode}`],
    mutationFn: async ({ data }) =>
      await postFetcher({ url: pathBackAuth.checkVerificationCode, data }),
    retry: 0,
    onSuccess(response) {
      if (response?.data) {
        setTokenCook(response.data.accessToken);

        useAuthStore.getState().setAuthHeadersAction(response.data);
        useAuthStore.getState().authTokenAction({
          token: response.data.accessToken,
        });

        options.cb && options.cb(response?.data);
      }
    },
    onError(error) {
      options.errorCb && options.errorCb(error?.data);
    },
  });

  return queryData;
};

export const PostSingUpQuery = (options) => {
  const queryDataPostLogin = PostLoginQuery({
    cb: () => options.cb(),
  });

  const queryData = useMutation({
    mutationKey: [`post_${pathBackAuth.signUp}`],
    mutationFn: async ({ data }) =>
      await postFetcher({ url: pathBackAuth.signUp, data }),
    retry: 0,
    onSuccess(response) {
      if (response?.data) {
        console.log("sss");

        queryDataPostLogin.mutate({
          data: {
            login: response?.data?.email,
          },
        });

        console.log("s-1");
      }
    },
    onError(error) {
      options.errorCb && options.errorCb(error?.data);
    },
  });

  return queryData;
};
