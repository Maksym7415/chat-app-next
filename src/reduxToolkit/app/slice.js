import { createSlice } from "@reduxjs/toolkit";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";

export const initialState = {
  openConversationId: null,
  sideLeftConfig: {
    page: SIDE_LEFT_TYPE_CONTENT.conversations,
  },
  messageEdit: {
    message: {},
    messageId: null,
  },
  forwardMessages: [],
  selectedChats: {},
  selectedMessages: {
    active: false,
    messages: {},
  },
  newChatData: {
    conversationData: null,
    newChatId: null,
  }, // need fix - коли зробитися роут newChatId перевірити чи потрібно цого обєкту
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    editMessageAction(state, { payload }) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    setLanguageAction(state, { payload }) {
      state.lang = payload;
    },
    deleteMessageAction(state, { payload }) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    shareMessageAction(state, { payload }) {
      state.forwardMessages = payload;
    },
    setSelectedChatsAction(state, { payload }) {
      state.selectedChats = payload;
    },
    setSelectedMessagesAction(state, { payload }) {
      state.selectedMessages = payload;
    },
    setOpenConversationIdAction(state, { payload }) {
      state.openConversationId = payload;
    },
    setNewChatDataAction(state, { payload }) {
      state.newChatData = payload;
    },
    setNewChatDataClearAction(state) {
      state.newChatData = initialState.newChatData;
    },
  },
});

export default appSlice.reducer;
export const {
  setSideLeftConfigAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  setSelectedChatsAction,
  setSelectedMessagesAction,
  setOpenConversationIdAction,
  setNewChatDataAction,
  setNewChatDataClearAction,
} = appSlice.actions;
