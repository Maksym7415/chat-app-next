import create from "zustand";
import { devtools } from "zustand/middleware";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";

export const initialState = {
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
  // drawer
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
  // modal
  modalConfig: {
    open: false,
    renderContent: "settingProfile",
    styles: {
      container: {},
    },
  },
  // dialogWindow
  dialogConfig: {
    open: false,
    typeContent: "",
    title: "",
  },
  //
  contextMenuConfig: {
    event: null,
    isShowMenu: false,
    messageId: 0,
    config: [],
    callBackItem: () => {},
  },
};

export const useAppStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS
    setMessagesChatAction(data) {
      set({ messagesChat: data });
    },
    setSideLeftConfigAction(data) {
      set({ sideLeftConfig: data });
    },
    setAllMessagesAction(data) {
      set({ allMessages: data });
    },
    editMessageAction(data) {
      set({ messageEdit: { ...get().messageEdit, ...data } });
    },
    setLanguageAction(data) {
      set({ forwardMessages: data });
      state.lang = payload;
    },
    deleteMessageAction(data) {
      set({ messageEdit: { ...get().messageEdit, ...data } });
    },
    shareMessageAction(data) {
      set({ forwardMessages: data });
    },
    setIsLoading(data) {
      set({ isLoading: data });
    },
    setSelectedChatsAction(data) {
      set({ selectedChats: data });
    },
    setSelectedMessagesAction(data) {
      set({ selectedMessages: data });
    },
    setOpenConversationIdAction(data) {
      set({ openConversationId: data });
    },
    // drawer
    setDrawerConfigAction(data) {
      set({ drawerConfig: data });
    },
    setDrawerClearConfigAction() {
      set({ drawerConfig: initialState.drawerConfig });
    },
    // modal
    setModalConfigAction(data) {
      set({ modalConfig: data });
    },
    setModalClearConfigAction() {
      set({ modalConfig: initialState.modalConfig });
    },
    // dialogWindow
    setDialogWindowConfigAction(data) {
      set({ dialogConfig: data });
    },
    setDialogWindowClearConfigAction() {
      set({ dialogConfig: initialState.dialogConfig });
    },
    //
    setContextMenuConfigAction(data) {
      set({ contextMenuConfig: data });
    },
    setContextMenuClearConfigAction(state) {
      state.contextMenuConfig = initialState.contextMenuConfig;
    },
  }))
);
