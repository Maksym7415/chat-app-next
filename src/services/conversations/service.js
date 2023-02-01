import { useQuery } from "react-query";
import { pathBackConversations } from "@/core/constants/urlBack";
import { fetchers } from "../fetchers";
import { store } from "@/store/store";
import {
  setConversationListAction,
  updateUserHistoryConversation,
} from "@/store/conversations/slice";
import { queryClient } from "@/pages/_app";
import { standardOnError, standardOnSuccess } from "@/services/helpers";
import { conversationsKeysQuery } from "@/services/keysQuery";
import { IS_CLIENT } from "@/core/constants/general";

export const GetUserConversationsQuery = (options) => {
  const params = options?.params || {};

  const onSuccessSetData = (data) => {
    store.dispatch(setConversationListAction(data));
  };

  const queryData = useQuery({
    queryKey: [conversationsKeysQuery.getUserConversations, params],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackConversations.getUserConversations,
        params,
      }),
    retry: 1,
    staleTime: Infinity,
    select({ data }) {
      const responseData = data?.data || data;
      const newData = responseData.reduce((acc, item) => {
        acc[item.conversationId] = item;
        return acc;
      }, {});
      return newData;
    },
    onSuccess(data) {
      onSuccessSetData(data);
      standardOnSuccess({ data, options });
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  if (
    queryData.data &&
    JSON.stringify(
      store.getState().conversationsSlice.conversationsList?.data
    ) === "{}"
  ) {
    onSuccessSetData(queryData.data);
  }

  return queryData;
};

export const GetConversationMessagesQuery = (options) => {
  const additionalUrl = options?.additionalUrl;
  const conversationId = options.conversationId;
  const params = options?.params || {};

  const onSuccessSetData = (response) => {
    store.dispatch(
      updateUserHistoryConversation({
        conversationId: options.conversationId,
        data: { pagination: response.data.pagination },
      })
    );
  };

  const queryData = useQuery({
    queryKey: [
      conversationsKeysQuery.conversationHistory,
      params,
      additionalUrl,
    ],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackConversations.conversationHistory,
        params,
        additionalUrl,
      }),
    retry: 1,
    staleTime: Infinity,
    enabled: !!additionalUrl,
    onSuccess(response) {
      console.log(response, "response!!!");
      // standardOnSuccess(response?.data);
      options?.cb && options.cb(response?.data);

      onSuccessSetData(response);
    },
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  console.log(queryData, "queryData");

  if (
    queryData?.data?.data?.data &&
    !store.getState().appSlice.allMessages[conversationId] &&
    conversationId
  ) {
    standardOnSuccess(queryData?.data);
    onSuccessSetData(queryData?.data);
  }

  return queryData;
};

// fetchQuery
export const getUserConversationsQuery = async ({ params = {}, cookies }) => {
  return await queryClient.fetchQuery({
    queryKey: [conversationsKeysQuery.getUserConversations, params],
    queryFn: async () => {
      const fetch = async () =>
        await fetchers({
          method: "get",
          url: pathBackConversations.getUserConversations,
          cookies,
        });
      if (IS_CLIENT) {
        return await fetch();
      } else {
        const response = await fetch();
        return response?.data;
      }
    },
    type: "active",
  });
};

export const getConversationMessagesQuery = async ({
  params = {},
  cookies,
  additionalUrl,
}) => {
  return await queryClient.fetchQuery({
    queryKey: [
      conversationsKeysQuery.conversationHistory,
      params,
      additionalUrl,
    ],
    queryFn: async () => {
      const fetch = async () =>
        await fetchers({
          method: "get",
          url: pathBackConversations.conversationHistory,
          cookies,
          params,
          additionalUrl,
        });
      if (IS_CLIENT) {
        return await fetch();
      } else {
        const response = await fetch();
        return response?.data;
      }
    },
    type: "active",
  });
};
