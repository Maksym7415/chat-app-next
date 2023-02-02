import { useMutation } from "react-query";
import { fetchers } from "../fetchers";
import { pathBackAuth } from "@/core/constants/urlBack";
import { setTokenCook } from "@/core/cookiesStorage";
import { standardOnError, standardOnSuccess } from "@/services/helpers";
import { authKeysQuery } from "@/services/keysQuery";
import { store } from "@/store/store";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHeadersAction,
  setVerificationCodeAction,
} from "@/store/auth/slice";

export const PostLoginQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [authKeysQuery.signIn],
    mutationFn: async ({ data }) => {
      store.dispatch(setLoginSingInAction(data.login));

      return await fetchers({
        method: "post",
        url: pathBackAuth.signIn,
        data,
      });
    },
    onSuccess(response) {
      standardOnSuccess({ response, options });

      if (response?.data) {
        store.dispatch(
          setVerificationCodeAction(response.data.verificationCode)
        );
      }
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

export const PostVerificationQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [authKeysQuery.checkVerificationCode],
    mutationFn: async ({ data }) =>
      await fetchers({
        method: "post",
        url: pathBackAuth.checkVerificationCode,
        data,
      }),
    onSuccess(response) {
      standardOnSuccess({ response, options });

      if (response?.data) {
        setTokenCook(response.data.accessToken);

        store.dispatch(setAuthHeadersAction(response.data));
        store.dispatch(
          authTokenAction({
            token: response.data.accessToken,
          })
        );
      }
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

export const PostSingUpQuery = (options) => {
  const queryDataPostLogin = PostLoginQuery({
    cb: () => options.cb(),
  });

  const queryData = useMutation({
    mutationKey: [authKeysQuery.signUp],
    mutationFn: async ({ data }) =>
      await fetchers({ method: "post", url: pathBackAuth.signUp, data }),
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
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};
