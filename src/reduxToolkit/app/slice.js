import { createSlice } from "@reduxjs/toolkit";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  app: "init",
  page: "init",
  server: {
    allMessages: {},
    openChatData: {},
  },
  isLoading: false,
  openConversationId: null,
  sideLeftConfig: {
    page: SIDE_LEFT_TYPE_CONTENT.conversations,
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
  newChatData: {
    conversationData: null,
    newChatId: null,
  },
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
      state.server.allMessages = {
        ...state.server.allMessages,
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
    setNewChatDataAction(state, { payload }) {
      state.newChatData = payload;
    },
    setNewChatDataClearAction(state) {
      console.log("---setOpenChatDataClearAction");
      state.newChatData = initialState.newChatData;
      // state.server.openChatData = {};
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     console.log(state.openChatData, "state");
  //     console.log(action.payload, "action.payload.appSlice");

  //     return {
  //       ...state,
  //       // ...action.payload.appSlice,
  //     };
  //   },
  // },
  // extraReducers(builder) {
  //   builder.addCase(HYDRATE, (state, action) => {
  //     // console.log(action.payload, "HYDRATE");
  //     // console.log(action.payload, " -- HYDRATE appSlice");
  //     return {
  //       ...state,
  //       // allMessages: {
  //       //   ...state.allMessages,
  //       //   ...action.payload.appSlice.allMessages,
  //       // },
  //       // ...action.payload.appSlice,

  //       // server: {
  //       //   ...action.payload.appSlice.server,
  //       // },
  //     };
  //   });
  // },
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
  setNewChatDataAction,
  setNewChatDataClearAction,
} = appSlice.actions;
