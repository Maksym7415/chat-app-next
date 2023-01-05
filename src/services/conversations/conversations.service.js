import useSWR from "swr";
import API from "@/core/axios/index";
import { pathBackConversations } from "@/core/constants/urlBack";
import { useConversationsStore } from "@/storeZustand/conversations/store";

export const getUserConversationsFetcher = async ({
  url = pathBackConversations.getUserConversations,
  options,
}) => {
  try {
    const response = await API.get(url);

    const data = response?.data?.data?.reduce((acc, item) => {
      acc[item.conversationId] = item;
      return acc;
    }, {});
    console.log(response, "response");
    options?.cb && options.cb(data);
    console.log("cb");
    useConversationsStore.getState().setConversationListAction(data);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConversationsService = {
  async useGetUserConversations(options) {
    const { data, error, isLoading } = useSWR(
      [pathBackConversations.getUserConversations, options],
      (url, options) => getUserConversationsFetcher(url, options),
      { revalidateOnFocus: false }
    );

    return {
      data,
      isLoading,
      error,
    };
  },
  async getConversationMessages(options) {
    try {
      const response = await API.get(
        `${pathBackConversations.conversationHistory}/${options.data.id}?offset=${options.data.offset}`
      );

      options?.cb && options.cb(response.data);

      useConversationsStore.getState().updateUserHistoryConversation({
        conversationId: options.data.id,
        data: { pagination: response.data.pagination },
      });

      const data = {
        data: response.data.data,
        pagination: response.data.pagination,
      };
      useConversationsStore.getState().setConversationMessagesAction(data);

      return data;
    } catch (error) {
      options?.errorCb && options.errorCb(error.data);

      return Promise.reject(error);
    }
  },
};
