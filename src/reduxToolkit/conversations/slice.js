import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationsList: {
    data: {},
  },
  conversationTypeState: {
    // 0: {
    //   isTyping: false,
    //   userId: 0,
    //   users: [
    //     {
    //       isTyping: false,
    //       firstName: "",
    //       userId: 0,
    //     },
    //   ],
    // },
  },
  historyConversationsId: {
    // 0: {
    //   messages: [],
    //   pagination: {
    //     allItems: 0,
    //     currentPage: 0,
    //   },
    // },
  },
};

export const conversationsSlice = createSlice({
  name: "conversationsSlice",
  initialState,
  reducers: {
    // conversationTypeState
    updateConversationTypeStateAction(state, { payload }) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload.data,
      };
    },
    // conversationsList
    updateConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...state.conversationsList.data,
        ...payload,
      };
    },
    setConversationListAction(state, { payload }) {
      state.conversationsList.data = payload;
    },
    // historyConversationsId
    setMessagesDataInConversationsIdAction(state, { payload }) {
      const chatId = state.historyConversationsId[payload.conversationId];
      const sDataConversationId = {
        ...chatId,
        messages: payload.messages,
      };

      if (payload?.pagination) {
        sDataConversationId.pagination = payload.pagination;
      }

      if (payload?.lastAction) {
        sDataConversationId.lastAction = payload.lastAction;
      }

      Object.assign(state.historyConversationsId, {
        [payload.conversationId]: sDataConversationId,
      });
    },
    clearMessagesDataInConversationsIdAction(state, { payload }) {
      const chatId = state.historyConversationsId[payload.conversationId];

      if (payload.ids?.length) {
        const sDataConversationId = {
          ...chatId,
          messages: [],
          pagination: {
            allItems: 0,
            currentPage: 0,
          },
        };

        const clearMessagesDataChatsId = payload.ids.reduce((acc, id) => {
          acc[id] = sDataConversationId;
        }, {});

        state.historyConversationsId = {
          ...state.historyConversationsId,
          ...clearMessagesDataChatsId,
        };
      }
    },
    removeConversationsIdAction(state, { payload }) {
      const historyChatsId = state.historyConversationsId;

      if (payload.ids?.length) {
        const newHistoryChatsId = Object.keys(historyChatsId).reduce(
          (acc, id) => {
            if (!payload.ids.includes(id)) {
              acc[id] = historyChatsId[id];
            }
            return acc;
          },
          {}
        );

        state.historyConversationsId = newHistoryChatsId;
      }
    },
  },
});

export default conversationsSlice.reducer;
