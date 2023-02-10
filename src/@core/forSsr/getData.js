import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { authTokenAction, setAuthHeadersAction } from "@/store/auth/slice";

export const getDataInitialServer = async (ctx, store) => {
  await store.dispatch(
    conversationsApi.endpoints.getUserConversations.initiate(
      {},
      { forceRefetch: true }
    )
  );
};

export const getInitialData = async (ctx, store) => {
  const token = getTokenCook() || ctx.req?.cookies?.accessToken;

  store.dispatch(setAuthHeadersAction({ accessToken: token }));

  if (token) {
    store.dispatch(
      authTokenAction({
        token,
      })
    );
  }

  await getDataInitialServer(ctx, store);

  return {};
};
