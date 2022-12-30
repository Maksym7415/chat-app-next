import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import { pathBackUser } from "../../config/constants/urlBack";

// need ts

export const getUserProfileDataRequest = createAsyncThunk(
  "user/getUserProfileDataRequest",
  async (options) => {
    try {
      const response = await API.get(pathBackUser.getUserProfileData);

      options?.cb && options.cb();

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getUserAvatars = createAsyncThunk(
  "user/getUserAvatars",
  async (options) => {
    try {
      const response = await API.get(pathBackUser.getAvatars);

      options?.cb && options.cb();

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const putUpdateProfileRequest = createAsyncThunk(
  "user/putUpdateProfileRequest",
  async (options) => {
    try {
      const response = await API.put(pathBackUser.updateProfile, {
        ...options.data,
      });

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      options?.errorCb && options.errorCb(error.data);

      return Promise.reject(error);
    }
  }
);

export const setMainPhotoRequest = createAsyncThunk(
  "user/setMainPhotoRequest",
  async (options) => {
    try {
      const response = await API.put(
        `${pathBackUser.setMainPhoto}/${options.photoId}`,
        {
          ...options.params,
        }
      );

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deleteAvatarRequest = createAsyncThunk(
  "user/deleteAvatarRequest",
  async (options) => {
    try {
      const response = await API.delete(
        `${pathBackUser.deleteAvatar}/${options.params.id}`
      );

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
