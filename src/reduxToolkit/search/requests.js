import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../@core/axios";
import { pathBackSearch } from "../../@core/constants/urlBack";
import { setLoadingSearchContacts } from "./slice";

export const getSearchContactRequest = createAsyncThunk(
  "search/getSearchContactRequest",
  async (options, { dispatch }) => {
    dispatch(setLoadingSearchContacts(true));
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

      return {
        search: searchParams,
        direction: directionAddResponse,
        offset: offsetParams,

        ...response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(setLoadingSearchContacts(false));
    }
  }
);

export const getOpponentsIdWhereConversTypeDialogRequest = createAsyncThunk(
  "search/getOpponentsIdWhereConversTypeDialogRequest",
  async (options) => {
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
  }
);
