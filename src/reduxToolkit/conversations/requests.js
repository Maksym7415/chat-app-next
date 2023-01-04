import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../@core/axios";
import { pathBackConversations } from "../../@core/constants/urlBack";
import { updateUserHistoryConversation } from "./slice";

export const getUserConversationsRequest = createAsyncThunk(
  "conversationsSlice/getUserConversationsRequest",
  async (options) => {
    try {
      const response = await API.get(
        pathBackConversations.getUserConversations
      );

      const data = response.data.data.reduce((acc, item) => {
        acc[item.conversationId] = item;
        return acc;
      }, {});

      options?.cb && options.cb(data);

      return {
        data,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getConversationMessagesRequest = createAsyncThunk(
  "conversationsSlice/getConversationMessagesRequest",
  async (options, { dispatch }) => {
    try {
      const response = await API.get(
        `${pathBackConversations.conversationHistory}/${options.data.id}?offset=${options.data.offset}`
      );

      options?.cb && options.cb(response.data);

      dispatch(
        updateUserHistoryConversation({
          conversationId: options.data.id,
          data: { pagination: response.data.pagination },
        })
      );

      return { data: response.data.data, pagination: response.data.pagination };
    } catch (error) {
      options?.errorCb && options.errorCb(error.data);

      return Promise.reject(error);
    }
  }
);
