import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 0: {
  //   messages: [],
  //   pagination: {
  //     allItems: 0,
  //     currentPage: 0,
  //   },
  // },
};

const historyConversationsIdSlice = createSlice({
  name: "historyConversationsIdSlice",
  initialState,
  reducers: {
    setMessagesDataInConversationsIdAction(state, { payload }) {
      const chatId = state[payload.conversationId];
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

      Object.assign(state, { [payload.conversationId]: sDataConversationId });
    },
    clearMessagesDataInConversationsIdAction(state, { payload }) {
      const chatId = state[payload.conversationId];

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

        state = {
          ...state,
          ...clearMessagesDataChatsId,
        };
      }
    },
    removeConversationsIdAction(state, { payload }) {
      const historyChatsId = state;

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

        state = newHistoryChatsId;
      }
    },
  },
});

export const {
  setMessagesDataInConversationsIdAction,
  clearMessagesDataInConversationsIdAction,
  removeConversationsIdAction,
} = historyConversationsIdSlice.actions;

export default historyConversationsIdSlice.reducer;
