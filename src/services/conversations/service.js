import { useQuery } from "react-query";

import { getUserConversationsFetcher } from "./conversations.fetchers";
import { pathBackConversations } from "@/core/constants/urlBack";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { getFetcher } from "../fetchers";

export const GetUserConversationsQuery = (options) => {
  const queryData = useQuery({
    queryKey: [`get_${pathBackConversations.getUserConversations}`, options],
    queryFn: async () => await getUserConversationsFetcher({ options }),
    retry: 1,
    staleTime: Infinity,
    onSuccess(data) {
      console.log(data, "onSuccess");
    },
    onError(error) {
      console.log(error, "onError");
      console.dir(error, "onError dir");
    },
  });

  if (
    queryData.data &&
    JSON.stringify(useConversationsStore.getState().conversationsList?.data) ===
      "{}"
  ) {
    console.log("change");
    useConversationsStore.getState().setConversationListAction(queryData.data);
  }

  // console.log("end");
  return queryData;
};

export const GetConversationMessagesQuery = (options) => {
  const additionalUrl = options?.additionalUrl || "";
  // console.log(options, "options");
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
    onSuccess(response) {
      // console.log(response, "onSuccess");

      options?.cb && options.cb(response?.data);

      // useConversationsStore.getState().updateUserHistoryConversation({
      //   conversationId: options.data.id,
      //   data: { pagination: response?.data?.pagination },
      // });

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

  return queryData;
};
