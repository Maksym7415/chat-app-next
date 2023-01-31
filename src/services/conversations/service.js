import { useQuery } from "react-query";
import { pathBackConversations } from "@/core/constants/urlBack";
import { getFetcher } from "../fetchers";
import { store } from "@/store/store";
import {
  setConversationListAction,
  updateUserHistoryConversation,
} from "@/store/conversations/slice";

export const GetUserConversationsQuery = (options) => {
  const queryData = useQuery({
    queryKey: [
      `get_${pathBackConversations.getUserConversations}`,
      options?.params || {},
    ],
    queryFn: async () =>
      await getFetcher({
        url: pathBackConversations.getUserConversations,
        options,
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
      store.dispatch(setConversationListAction(data));
      options.cb && options.cb();
      console.log(data, "onSuccess");
    },
    onError(error) {
      console.dir(error, "onError dir");
    },
  });

  if (
    queryData.data &&
    JSON.stringify(
      store.getState().conversationsSlice.conversationsList?.data
    ) === "{}"
  ) {
    store.dispatch(setConversationListAction(queryData.data));
  }

  return queryData;
};

export const GetConversationMessagesQuery = (options) => {
  const additionalUrl = options?.additionalUrl;
  const conversationId = options.conversationId;

  const queryData = useQuery({
    queryKey: [
      `get_${pathBackConversations.conversationHistory}`,
      options.params,
      additionalUrl,
    ],
    queryFn: async () =>
      await getFetcher({
        url: pathBackConversations.conversationHistory,
        options,
        additionalUrl,
      }),
    retry: 1,
    staleTime: Infinity,
    enabled: !!additionalUrl,
    onSuccess(response) {
      // console.log(response, "onSuccess");

      options?.cb && options.cb(response?.data);

      // useConversationsStore.getState().updateUserHistoryConversation({
      //   conversationId: options.data.id,
      //   data: { pagination: response?.data?.pagination },
      // });

      store.dispatch(
        updateUserHistoryConversation({
          conversationId: options.conversationId,
          data: { pagination: response.data.pagination },
        })
      );

      // const data = {
      //   data: response?.data?.data,
      //   pagination: response?.data?.pagination,
      // };
      // useConversationsStore.getState().setConversationMessagesAction(data);
    },
    onError(error) {
      options?.errorCb && options.errorCb(error.data);

      console.log(error, "onError");
      console.dir(error, "onError dir");
    },
  });

  if (
    queryData?.data?.data &&
    !store.getState().appSlice.allMessages[conversationId] &&
    conversationId
  ) {
    store.dispatch(
      updateUserHistoryConversation({
        conversationId: conversationId,
        data: { pagination: queryData?.data?.pagination },
      })
    );

    options?.cb && options.cb(queryData?.data);
  }

  return queryData;
};
