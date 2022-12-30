import create from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  contacts: [],
  isLoading: false,
};

export const useSettingStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS

    // REQUEST
    postCheckEmailsRequest: async (options) => {
      try {
        const response = await API.post(pathBackSearch.checkEmails, {
          ...options.data,
        });

        options?.cb && options.cb(response.data);

        set({ contacts: response.data });

        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  }))
);
