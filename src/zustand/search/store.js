import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
import { pathBackSearch } from "@/core/constants/urlBack";
import API from "@/core/axios";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  searchContacts: {
    response: [],
    limit: 0,
    search: "",
    direction: "",
    offset: 0,
  },
  searchSettingsQuestions: { response: [] },
  isLoading: false,
  count: 0,
};
// useSearchStore
export const searchStore = create(
  persist(
    (set, get) => ({
      // STATES
      // ...initialState,
      searchContacts: {
        response: [],
        limit: 0,
        search: "",
        direction: "",
        offset: 0,
      },
      searchSettingsQuestions: { response: [] },
      isLoading: false,
      count: 0,

      // ACTIONS
      setLoadingSearchContacts(data) {
        set({ isLoading: data });
      },
      setSearchContactsAction(data) {
        // console.log(data, "setSearchContactsAction");
        // return set((state) => ({ ...state, searchContacts: data }));
        set((state) => {
          state.searchContacts = data;
        });
      },
      setCountAction(data) {
        return set({ count: get().count + data });
      },
      increment: () => {
        set({
          count: get().count + 1,
        });
      },
      reset: () => {
        set({
          count: getDefaultInitialState().count,
        });
      },
    })
    // {
    //   name: "food-storage", // unique name
    //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    // }
  )
);
