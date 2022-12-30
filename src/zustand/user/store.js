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

    // REQUEST
    getUserProfileDataRequest: async (options) => {
      try {
        const response = await API.get(pathBackUser.getUserProfileData);

        options?.cb && options.cb();

        set({ userInfo: response.data });

        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    getUserAvatars: async (options) => {
      try {
        const response = await API.get(pathBackUser.getAvatars);

        options?.cb && options.cb();

        set({ avatars: response.data });

        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    putUpdateProfileRequest: async (options) => {
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

    setMainPhotoRequest: async (options) => {
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

    deleteAvatarRequest: async (options) => {
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
  }))
);
