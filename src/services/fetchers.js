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
    throw new Error(JSON.stringify(error));
    return Promise.reject(error);
  }
  throw new Error(error);
};

export const getFetcher = async ({ url, options, cookies }) => {
  const params = options?.params || {};
  const additionalUrl = options?.additionalUrl
    ? `/${options?.additionalUrl}`
    : "";

  // console.log(additionalUrl, "additionalUrl");
  // console.log(params, "params");
  try {
    const accessToken = getTokenCook() || cookies?.accessToken;
    let headers = getHeaders({ token: accessToken });

    const response = await API.get(url + additionalUrl, {
      params,
      headers,
    });
    // console.log(response, "response");
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
