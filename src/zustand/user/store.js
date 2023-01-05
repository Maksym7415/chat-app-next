import create from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  userInfo: {
    id: 0,
    login: "",
    firstName: "",
    lastName: "",
    tagName: "",
    fullName: "",
    status: "",
    userAvatar: "",
    userCreationTime: "",
    userUpdateTime: "",
    userLastTimeOnline: "",
    Roles: [],
    lang: "",
  },
  avatars: [],
};

export const useUserStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS
    seUserInfoAction(data) {
      set({ userInfo: data });
    },
    seUserAvatarsAction(data) {
      set({ avatars: data });
    },
  }))
);
