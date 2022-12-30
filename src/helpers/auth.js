import { store } from "../reduxToolkit/store";

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    const {
      headers: { accessToken },
    } = state.authSlice;

    let headersConfig = {};

    if (accessToken) {
      headersConfig.Authorization = "Bearer " + accessToken;
    }

    return Object.keys(headersConfig).length ? headersConfig : null;
  } catch (error) {}
};
