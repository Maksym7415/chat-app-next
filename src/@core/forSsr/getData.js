import { pathBackConversations } from "@/core/constants/urlBack";
import { fetchers } from "@/services/fetchers";
import { pathBackUser } from "@/core/constants/urlBack";
import { queryClient } from "@/pages/_app";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { authTokenAction } from "@/store/auth/slice";
import { store as storeRedux } from "@/store/store";
import { getUserConversationsQuery } from "@/services/conversations/service";

export const getDataInitialServer = async (ctx, store) => {
  // const conversationsListObj =
  //   store.getState().conversationsSlice.conversationsList.data;
  // const userInfo = store.getState().userSlice.userInfo;

  // console.log(
  //   store.getState().conversationsSlice,
  //   "store.getState().conversationsSlice"
  // );
  // if (conversationsListObj && !Object.values(conversationsListObj)?.length) {
  await getUserConversationsQuery({
    cookies: ctx.req?.cookies,
  });

  return queryClient;
};

export const getInitialData = async (ctx, store) => {
  const token = getTokenCook() || ctx.req?.cookies?.accessToken;
  // const authToken = store.getState().authSlice.authToken;

  const queryClientResponse = await getDataInitialServer(ctx, store);

  // if (token) {
  //   storeRedux.dispatch(
  //     authTokenAction({
  //       token,
  //     })
  //   );
  // }

  return {
    queryClient: queryClientResponse,
  };
};
