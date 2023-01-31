import { useQuery, useMutation } from "react-query";
import { pathBackUser } from "@/core/constants/urlBack";
import { getFetcher, putFetcher } from "../fetchers";
import { store } from "@/store/store";
import { setUserInfoAction } from "@/store/user/slice";
import { setLangAction } from "@/store/setting/slice";
import { queryClient } from "@/pages/_app";

export const GetUserProfileDataQuery = (options) => {
  const queryData = useQuery({
    queryKey: [`get_${pathBackUser.getUserProfileData}`],
    queryFn: async () =>
      await getFetcher({
        url: pathBackUser.getUserProfileData,
      }),
    retry: 0,
    staleTime: Infinity,
    onSuccess(response) {
      console.log(response, "response");
      response.data?.lang && store.dispatch(setLangAction(response.data?.lang));
      store.dispatch(setUserInfoAction(response.data));
    },
    onError(error) {
      options?.errorCb && options.errorCb(error.data);

      console.dir(error, "onError dir");

      return error;
    },
  });

  if (
    queryData.data &&
    JSON.stringify(store.getState().userSlice.userInfo?.id) === "0"
  ) {
    queryData.data?.lang && store.dispatch(setLangAction(queryData.data?.lang));

    store.dispatch(setUserInfoAction(queryData.data));
  }

  return queryData;
};

export const getFetchUserProfileDataQuery = async () => {
  return await queryClient.fetchQuery({
    queryKey: [`get_${pathBackUser.getUserProfileData}`],
    queryFn: async () =>
      await getFetcher({
        url: pathBackUser.getUserProfileData,
      }),
    type: "active",
  });
};

export const PutUpdateProfileDataQuery = (options) => {
  const queryData = useMutation({
    mutationKey: [`get_${pathBackUser.updateProfile}`],
    mutationFn: async ({ data }) => {
      // store.dispatch(setLoginSingInAction(data.login));

      return await putFetcher({ url: pathBackUser.updateProfile, data });
    },
    retry: 0,
    onSuccess(response) {
      options.cb && options.cb(response?.data);
    },
    onError(error) {
      options?.errorCb && options.errorCb(error.data);

      console.dir(error, "onError dir");

      return error;
    },
  });

  return queryData;
};
