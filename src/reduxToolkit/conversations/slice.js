import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  conversationMessages: {
    data: [],
    pagination: {
      allItems: 0,
      currentPage: 0,
    },
  },
  userHistoryConversations: {},
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

const conversationsSlice = createSlice({
  name: "conversationsSlice",
  initialState,
  reducers: {
    updateConversationTypeStateAction(state, { payload }) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload.data,
      };
    },
    updateConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...state.conversationsList.data,
        ...payload,
      };
    },
    setConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...payload,
      };
    },
    setMessagesInChatIdAction(state, { payload }) {
      state.userHistoryConversations[payload.chatId] = {
        ...payload,
      };
    },

    updateUserHistoryConversation(state, { payload }) {
      state.userHistoryConversations = {
        ...state.userHistoryConversations,
        [payload.conversationId]: {
          ...state.userHistoryConversations?.[payload.conversationId],
          ...payload.data,
        },
      };
    },
  },
});

export const {
  updateConversationTypeStateAction,
  updateConversationListAction,
  updateUserHistoryConversation,
  setConversationListAction,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
