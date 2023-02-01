import {
  pathBackAuth,
  pathBackUser,
  pathBackSearch,
  pathBackConversations,
} from "@/core/constants/urlBack";

export const userKeysQuery = {
  getUserProfileData: `get_${pathBackUser.getUserProfileData}`,
  getAvatars: `get_${pathBackUser.getAvatars}`,
  updateProfile: `put_${pathBackUser.updateProfile}`,
  setMainPhoto: `put_${pathBackUser.setMainPhoto}`,
  deleteAvatar: `delete_${pathBackUser.deleteAvatar}`,
};

export const searchKeysQuery = {
  searchContact: `get_${pathBackSearch.searchContact}`,
};

export const conversationsKeysQuery = {
  getUserConversations: `get_${pathBackConversations.getUserConversations}`,
  conversationHistory: `get_${pathBackConversations.conversationHistory}`,
};

export const authKeysQuery = {
  signIn: `post_${pathBackAuth.signIn}`,
  checkVerificationCode: `post_${pathBackAuth.checkVerificationCode}`,
  signUp: `post_${pathBackAuth.signUp}`,
};
