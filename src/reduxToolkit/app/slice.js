import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
  isLoading: false,
  openConversationId: null,
  sideLeftConfig: {
    // page: eSideLeftConfigPage.conversations,
  },
  allMessages: {},
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
  messagesChat: [],
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setMessagesChatAction(state, { payload }) {
      state.messagesChat = payload;
    },
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    setAllMessagesAction(state, { payload }) {
      state.allMessages = {
        ...state.allMessages,
        ...payload,
      };
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
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
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
  },
});

export default appSlice.reducer;
export const {
  setSideLeftConfigAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  setIsLoading,
  setSelectedChatsAction,
  setSelectedMessagesAction,
  setAllMessagesAction,
  setMessagesChatAction,
  setOpenConversationIdAction,
} = appSlice.actions;
