import create from "zustand";
import { devtools } from "zustand/middleware";

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
};

export const useSettingStore = create(
  devtools((set, get) => ({
    // STATES
    ...initialState,

    // ACTIONS
    setLoadingSearchContacts(data) {
      set({ isLoading: data });
    },

    // REQUEST
    getSearchContactRequest: async (options) => {
      get().setLoadingSearchContacts(true);
      const params = {};

      const directionAddResponse = options?.direction || "";

      const searchParams = options?.params?.search || "";
      const offsetParams = options?.params?.offset || 0;

      if (searchParams) {
        params.searchRequest = searchParams;
      }
      if (offsetParams) {
        params.offset = offsetParams;
      }

      try {
        const response = await API.get(pathBackSearch.searchContact, {
          params,
        });

        options?.cb && options.cb();

        set({
          searchContacts: {
            search: searchParams,
            direction: directionAddResponse,
            offset: offsetParams,

            ...response.data,
          },
        });

        return {
          search: searchParams,
          direction: directionAddResponse,
          offset: offsetParams,

          ...response.data,
        };
      } catch (error) {
        return Promise.reject(error);
      } finally {
        get().setLoadingSearchContacts(false);
      }
    },

    getOpponentsIdWhereConversTypeDialogRequest: async (options) => {
      try {
        const response = await API.get(
          pathBackSearch.getOpponentsIdWhereConversTypeDialog,
          {
            params: options?.params,
          }
        );

        options?.cb && options.cb(response.data);

        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  }))
);
