import {
  actionsTypeActionsConversation,
  actionsTypeActionsChat,
} from "@/core/constants/actions";
import languages from "@/core/translations/index";

export const headerSelectedChatsAmount = (lang) => [
  {
    id: 1,
    title: "Edit",
    value: actionsTypeActionsChat.editMessage,
    icon: {
      name: "svgs_line_pencil",
    },
  },
  {
    id: 2,
    title: "Copy",
    value: actionsTypeActionsChat.copyMessage,
    icon: {
      name: "svgs_line_copy",
    },
  },
  {
    id: 3,
    title: "Forward",
    value: actionsTypeActionsChat.forwardMessage,
    icon: {
      name: "svgs_line_forward",
    },
  },
  {
    id: 4,
    title: "Del",
    value: actionsTypeActionsChat.deleteMessages,
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
  },
];

export const headerChatDotsOptionsDialog = (lang) => [
  // {
  //   id: 3,
  //   title: "Search",
  //   value: "search",
  //   icon: {
  //     name: "svgs_line_search",
  //   },
  //   noFunctional: true,
  // },
  {
    id: 2,
    title: "Select messages",
    value: actionsTypeActionsChat.selectMessages,
    icon: {
      name: "svgs_filled_check_square",
    },
  },
  {
    id: 3,
    title: languages[lang].generals.clearHistory,
    value: actionsTypeActionsConversation.clearChat,
    type: "conversation",
    icon: {
      name: "svgs_line_clear",
    },
  },
  {
    id: 4,
    title: "Remove Chat",
    value: actionsTypeActionsConversation.deleteChat,
    type: "conversation",
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
    noFunctional: true,
  },
];

export const headerChatDotsOptionsChat = (lang) => [
  // {
  //   id: 2,
  //   title: "Search",
  //   value: "search",
  //   icon: {
  //     name: "svgs_line_search",
  //   },
  //   noFunctional: true,
  // },
  {
    id: 2,
    title: "Select messages",
    value: actionsTypeActionsChat.selectMessages,
    icon: {
      name: "svgs_filled_check_square",
    },
  },
  {
    id: 4,
    title: languages[lang].generals.clearHistory,
    value: actionsTypeActionsConversation.clearChat,
    type: "conversation",
    icon: {
      name: "svgs_line_clear",
    },
  },
  {
    id: 5,
    title: "Delete and leave the group",
    value: actionsTypeActionsConversation.deleteChat,
    type: "conversation",
    icon: {
      name: "svgs_line_logOut",
    },
  },
];
