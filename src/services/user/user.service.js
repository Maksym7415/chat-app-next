import API from "@/core/axios";
import { pathBackUser } from "@/core/constants/urlBack";
import { useUserStore } from "@/storeZustand/user/store";

export const UserService = {
  async getUserProfileData(options) {
    try {
      const response = await API.get(pathBackUser.getUserProfileData);

      options?.cb && options.cb();

      useUserStore.getState().seUserInfoAction(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getUserAvatars(options) {
    try {
      const response = await API.get(pathBackUser.getAvatars);

      options?.cb && options.cb();

      useUserStore.getState().seUserAvatarsAction(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async putUpdateProfile(options) {
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
  },
  async putMainPhoto(options) {
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
  },
  async deleteAvatar(options) {
    try {
      const response = await API.delete(
        `${pathBackUser.deleteAvatar}/${options.params.id}`
      );

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
