export const TYPES_CONVERSATIONS = {
  dialog: "dialog",
  chat: "chat",
  group: "group",
};

export const TYPES_FROM_TO_SEARCH_SCREEN = {
  main: "main",
  profile: "profile",
};

export const SIDE_LEFT_TYPE_CONTENT = {
  conversations: "conversations",
  searchContacts: "searchContacts",
};

export const namesCookies = {
  accessToken: "accessToken",
  lang: "@@lang",
};

export const CONTEXT_MENU_ID = {
  main: "id_main_menu",
};

export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = typeof window !== "undefined";
