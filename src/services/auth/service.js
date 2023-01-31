import { useMutation } from "react-query";
import { postFetcher } from "../fetchers";
import { pathBackAuth } from "@/core/constants/urlBack";
import { setTokenCook } from "@/core/cookiesStorage";
import { store } from "@/store/store";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHeadersAction,
  setVerificationCodeAction,
} from "@/store/auth/slice";
import Snackbar from "@/helpers/notistack";
import { parseStringJSON } from "@/helpers/index";

export const PostLoginQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [`post_${pathBackAuth.signIn}`],
    mutationFn: async ({ data }) => {
      store.dispatch(setLoginSingInAction(data.login));

      return await postFetcher({ url: pathBackAuth.signIn, data });
    },
    retry: 0,
    onSuccess(response) {
      if (response?.data) {
        store.dispatch(
          setVerificationCodeAction(response.data.verificationCode)
        );

        options.cb && options.cb(response?.data);
      }
    },
    onError(errorRes) {
      const error = parseStringJSON(errorRes?.message);

      error?.message && Snackbar.error(error?.message);

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

        store.dispatch(setAuthHeadersAction(response.data));
        store.dispatch(
          authTokenAction({
            token: response.data.accessToken,
          })
        );

        options.cb && options.cb(response?.data);
      }
    },
    onError(errorRes) {
      const error = parseStringJSON(errorRes?.message);

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
        queryDataPostLogin.mutate({
          data: {
            login: response?.data?.email,
          },
        });
      }
    },
    onError(errorRes) {
      const error = parseStringJSON(errorRes?.message);

      options.errorCb && options.errorCb(error?.data);
    },
  });

  return queryData;
};
