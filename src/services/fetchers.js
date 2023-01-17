import { getTokenCook } from "@/core/cookiesStorage/index";
import API from "@/core/axios/index";
import { IS_CLIENT } from "@/core/constants/general";

const getHeaders = ({ token }) => {
  let headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return headers;
};

const catchHandle = (error) => {
  if (IS_CLIENT) {
    return Promise.reject(error);
  }
  throw new Error(error);
};

export const getFetcher = async ({ url, options, cookies }) => {
  const params = options?.params || {};

  try {
    const accessToken = getTokenCook() || cookies?.accessToken;
    let headers = getHeaders({ token: accessToken });

    const response = await API.get(url, {
      params,
      headers,
    });

    return response;
  } catch (error) {
    return catchHandle(error);
  }
};

export const postFetcher = async ({ url, data, cookies }) => {
  try {
    const accessToken = getTokenCook() || cookies?.accessToken;
    let headers = getHeaders({ token: accessToken });

    const response = await API.post(url, data, { headers });

    return response;
  } catch (error) {
    return catchHandle(error);
  }
};
