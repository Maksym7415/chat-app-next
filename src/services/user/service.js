import { useQuery, useMutation } from "react-query";
import { pathBackUser } from "@/core/constants/urlBack";
import { queryClient } from "@/pages/_app";
import { standardOnError, standardOnSuccess } from "@/services/helpers";
import { userKeysQuery } from "@/services/keysQuery";
import { fetchers } from "@/services/fetchers";
import { store } from "@/store/store";
import { setUserInfoAction, seUserAvatarsAction } from "@/store/user/slice";
import { setLangAction } from "@/store/setting/slice";

export const GetUserProfileDataQuery = (options) => {
  const onSuccessSetData = (response) => {
    response.data?.lang && store.dispatch(setLangAction(response.data?.lang));
    store.dispatch(setUserInfoAction(response.data));
  };

  const queryData = useQuery({
    queryKey: [userKeysQuery.getUserProfileData],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackUser.getUserProfileData,
      }),
    staleTime: Infinity,
    onSuccess(response) {
      onSuccessSetData(response);
      standardOnSuccess({ response, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  if (
    queryData.data &&
    JSON.stringify(store.getState().userSlice.userInfo?.id) === "0"
  ) {
    onSuccessSetData(queryData);
  }

  return queryData;
};

export const GetUserAvatarsQuery = (options) => {
  const queryData = useQuery({
    queryKey: [userKeysQuery.getAvatars],
    queryFn: async () => {
      return await fetchers({
        method: "get",
        url: pathBackUser.getAvatars,
      });
    },
    staleTime: Infinity,
    onSuccess(response) {
      store.dispatch(seUserAvatarsAction(response.data));

      standardOnSuccess({ response, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

export const PutUpdateProfileDataQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [userKeysQuery.updateProfile],
    mutationFn: async ({ data }) =>
      await fetchers({
        method: "put",
        url: pathBackUser.updateProfile,
        data,
      }),
    onSuccess(response) {
      standardOnSuccess({ response, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

export const PutMainPhotoQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [userKeysQuery.setMainPhoto, options.params],
    mutationFn: async () => {
      return await fetchers({
        method: "put",
        url: pathBackUser.setMainPhoto,
        additionalUrl: options?.additionalUrl,
      });
    },
    onSuccess(response) {
      standardOnSuccess({ response, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

export const DeleteAvatarQuery = (options) => {
  const params = options.params || {};
  const queryData = useMutation({
    mutationKey: [userKeysQuery.deleteAvatar, params],
    mutationFn: async () => {
      return await fetchers({
        method: "delete",
        url: pathBackUser.deleteAvatar,
        params,
      });
    },
    onSuccess(response) {
      standardOnSuccess({ response, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  return queryData;
};

// fetchQuery
export const getFetchUserProfileDataQuery = async () => {
  return await queryClient.fetchQuery({
    queryKey: [userKeysQuery.getUserProfileData],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackUser.getUserProfileData,
      }),
    type: "active",
  });
};

export const getUserAvatarsQuery = async () => {
  return await queryClient.fetchQuery({
    queryKey: [userKeysQuery.getAvatars],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackUser.getAvatars,
      }),
    type: "active",
  });
};
