import { createSlice } from "@reduxjs/toolkit";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";

export const initialState = {
  sideLeftConfig: {
    page: SIDE_LEFT_TYPE_CONTENT.conversations,
  },
  contextMenuConfig: {
    event: null,
    isShowMenu: false,
    messageId: 0,
    config: [],
    callBackItem: null,
  },
  dialogConfig: {
    open: false,
    typeContent: "",
    title: "",
  },
  modalConfig: {
    open: false,
    renderContent: "settingProfile",
    styles: {
      container: {},
    },
  },
  drawerConfig: {
    anchor: "left",
    open: false,
    type: "",
    width: 300,
    configContent: {
      typeProfile: "",
      conversationData: {},
    },
  },
  messageEdit: {
    message: {},
    messageId: null,
  },
  forwardMessages: [],
  selectedMessages: {
    active: false,
    messages: {},
  },
  newChatData: {
    conversationData: null,
    newChatId: null,
  }, // need fix - коли зробитися роут newChatId перевірити чи потрібно цого обєкту
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    // sideLeftConfig
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    // contextMenuConfig
    setContextMenuConfigAction(state, { payload }) {
      state.contextMenuConfig = payload;
    },
    setContextMenuClearConfigAction(state) {
      state.contextMenuConfig = initialState.contextMenuConfig;
    },
    // dialogConfig
    setDialogWindowConfigAction(state, { payload }) {
      state.dialogConfig = payload;
    },
    setDialogWindowClearConfigAction(state) {
      state.dialogConfig = initialState.dialogConfig;
    },
    // modalConfig
    setModalConfigAction(state, { payload }) {
      state.modalConfig = payload;
    },
    setModalClearConfigAction(state) {
      state.modalConfig = initialState.modalConfig;
    },
    // drawerConfig
    setDrawerConfigAction(state, { payload }) {
      state.drawerConfig = payload;
    },
    setDrawerClearConfigAction(state) {
      state.drawerConfig = initialState.drawerConfig;
    },
    // messageEdit
    editMessageAction(state, { payload }) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    // forwardMessages
    shareMessageAction(state, { payload }) {
      state.forwardMessages = payload;
    },
    // selectedMessages
    setSelectedMessagesAction(state, { payload }) {
      state.selectedMessages = payload;
    },
    // newChatData
    setNewChatDataAction(state, { payload }) {
      state.newChatData = payload;
    },
    setNewChatDataClearAction(state) {
      state.newChatData = initialState.newChatData;
    },
  },
});

export default appSlice.reducer;
