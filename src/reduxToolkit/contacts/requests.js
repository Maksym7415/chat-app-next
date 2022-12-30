import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import { pathBackSearch } from "../../config/constants/urlBack";

export const postCheckEmailsRequest = createAsyncThunk(
  "contacts/postCheckEmailsRequest",
  async (options) => {
    try {
      const response = await API.post(pathBackSearch.checkEmails, {
        ...options.data,
      });

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
