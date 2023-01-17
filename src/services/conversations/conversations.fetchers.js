import { getTokenCook } from "@/core/cookiesStorage/index";
import API from "@/core/axios/index";
import { pathBackConversations } from "@/core/constants/urlBack";

export const getUserConversationsFetcher = async ({ options, cookies }) => {
  // console.log(options, "options");
  // console.log(cookies, "cookies");
  const params = options?.params || {};

  try {
    const accessToken = getTokenCook() || cookies?.accessToken;

    const response = await API.get(pathBackConversations.getUserConversations, {
      params,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = response?.data?.data?.reduce((acc, item) => {
      acc[item.conversationId] = item;
      return acc;
    }, {});

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
