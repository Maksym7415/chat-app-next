import create from "zustand";
import { devtools } from "zustand/middleware";
import { setLanguageCook } from "@/config/cookiesStorage/index";

const initialState = {
  error: {},
  isLangSet: false,
  lang: "en",
  theme: {
    core: "light",
  },
};

export const useSettingStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS
    setLangAction(data) {
      setLanguageCook(data);
      set({ isLangSet: true, lang: data });
    },
    setThemeAction(data) {
      set({ theme: { ...get().theme, ...data } });
    },
  }))
);
