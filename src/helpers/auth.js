import { store } from "../reduxToolkit/store";
import { getTokenCook } from "@/core/cookiesStorage/index";

export const getHeaders = async () => {
  try {
    const state = await store.getState();

    let headersConfig = {};

    const accessToken = getTokenCook();

    if (accessToken) {
      headersConfig.Authorization = "Bearer " + accessToken;
    }

    return Object.keys(headersConfig).length ? headersConfig : null;
  } catch (error) {}
};
