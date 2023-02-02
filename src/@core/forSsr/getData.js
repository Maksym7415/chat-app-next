import { queryClient } from "@/pages/_app";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { authTokenAction } from "@/store/auth/slice";
import { getUserConversationsQuery } from "@/services/conversations/service";

export const getDataInitialServer = async (ctx) => {
  await getUserConversationsQuery({
    cookies: ctx.req?.cookies,
  });

  return queryClient;
};

export const getInitialData = async (ctx, store) => {
  const token = getTokenCook() || ctx.req?.cookies?.accessToken;

  const queryClientResponse = await getDataInitialServer(ctx);

  if (token) {
    store.dispatch(
      authTokenAction({
        token,
      })
    );
  }

  return {
    queryClient: queryClientResponse,
  };
};
