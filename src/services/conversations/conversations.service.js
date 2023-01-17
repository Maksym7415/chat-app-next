import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import API from "@/core/axios/index";
import { pathBackConversations } from "@/core/constants/urlBack";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { getUserConversationsFetcher } from "./conversations.fetchers";

export const ConversationsService = {
  async useGetUserConversations(options) {
    const { data, error, isLoading } = useSWRImmutable(
      [pathBackConversations.getUserConversations, options],
      getUserConversationsFetcher
    );
    // console.log(data, "data");
    // console.log(isLoading, "isLoading");
    if (
      data &&
      JSON.stringify(data) !==
        JSON.stringify(useConversationsStore.getState().conversationsList?.data)
    ) {
      console.log("change");
      useConversationsStore.getState().setConversationListAction(data);

      options?.cb && options.cb(data);
    }

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

      options?.cb && options.cb(response?.data);

      useConversationsStore.getState().updateUserHistoryConversation({
        conversationId: options.data.id,
        data: { pagination: response?.data?.pagination },
      });

      const data = {
        data: response?.data?.data,
        pagination: response?.data?.pagination,
      };
      useConversationsStore.getState().setConversationMessagesAction(data);

      return data;
    } catch (error) {
      options?.errorCb && options.errorCb(error.data);

      return Promise.reject(error);
    }
  },
};
