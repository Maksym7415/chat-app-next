import create from "zustand";
import { devtools } from "zustand/middleware";
import API from "@/core/axios";
import { pathBackConversations } from "@/core/constants/urlBack";

const initialState = {
  conversationMessages: {
    data: [],
    pagination: {
      allItems: 0,
      currentPage: 0,
    },
  },
  userHistoryConversations: {
    // [0]: {
    //   pagination: {
    //     allItems: 0,
    //     currentPage: 0,
    //   },
    // },
  },
  conversationsList: {
    data: {},
  },
  conversationTypeState: {
    0: {
      isTyping: false,
      userId: 0,
      users: [
        {
          isTyping: false,
          firstName: "",
          userId: 0,
        },
      ],
    },
  },
};

export const useConversationsStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS
    updateConversationTypeStateAction(data) {
      set({
        conversationTypeState: {
          ...get().conversationTypeState,
          [data.conversationId]: data.data,
        },
      });
    },
    updateConversationListAction(data) {
      set({ conversationsList: { ...get().conversationsList, ...data } });
    },
    setConversationListAction(data) {
      set({
        conversationsList: {
          data: data,
        },
      });
    },
    setConversationMessagesAction(data) {
      set({
        conversationMessages: data,
      });
    },
    updateUserHistoryConversation(data) {
      set({
        userHistoryConversations: {
          ...get().userHistoryConversations,
          [data.conversationId]: {
            ...get().userHistoryConversations?.[data.conversationId],
            ...data.data,
          },
        },
      });
    },
    // REQUEST
    getUserConversationsRequest: async (options) => {
      try {
        const response = await API.get(
          pathBackConversations.getUserConversations
        );

        const data = response.data.data.reduce((acc, item) => {
          acc[item.conversationId] = item;
          return acc;
        }, {});

        options?.cb && options.cb(data);

        get().setConversationListAction(data);

        return {
          data,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getConversationMessagesRequest: async (options) => {
      try {
        const response = await API.get(
          `${pathBackConversations.conversationHistory}/${options.data.id}?offset=${options.data.offset}`
        );

        options?.cb && options.cb(response.data);

        get().updateUserHistoryConversation({
          conversationId: options.data.id,
          data: { pagination: response.data.pagination },
        });

        set({
          conversationMessages: {
            data: response.data.data,
            pagination: response.data.pagination,
          },
        });

        return {
          data: response.data.data,
          pagination: response.data.pagination,
        };
      } catch (error) {
        options?.errorCb && options.errorCb(error.data);

        return Promise.reject(error);
      }
    },
  }))
);
