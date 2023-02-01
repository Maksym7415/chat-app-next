import { getTokenCook } from "@/core/cookiesStorage/index";
import API from "@/core/axios/index";
import { IS_CLIENT } from "@/core/constants/general";
import Snackbar from "@/helpers/notistack";
import { delay } from "@/helpers/tests/";

const methodsRequestWithData = [
  "post",
  "put",
  "patch",
  "postForm",
  "putForm",
  "patchForm",
];
const methodsRequestWithoutData = ["options", "head", "delete", "get"];

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

export const fetchers = async ({
  url,
  data = {},
  cookies,
  method = "",
  additionalUrl,
  params = {},
}) => {
  if (
    ![...methodsRequestWithData, ...methodsRequestWithoutData].includes(
      method?.toLocaleLowerCase()
    ) &&
    IS_CLIENT
  ) {
    !method
      ? Snackbar.error("Невказано method запиту")
      : Snackbar.error("Невірно вказано method запиту");
    return null;
  }

  try {
    const accessToken = getTokenCook() || cookies?.accessToken;

    let headers = getHeaders({ token: accessToken });

    const additionalUrlLoc = additionalUrl ? `/${additionalUrl}` : "";

    const requestOptions = {
      url: url + additionalUrlLoc,
      data: data,
      config: {
        headers,
        params,
      },
    };

    let response = null;

    if (methodsRequestWithoutData.includes(method.toLocaleLowerCase())) {
      response = await API[method](requestOptions.url, {
        ...requestOptions.config,
      });
    } else {
      response = await API[method](requestOptions.url, requestOptions.data, {
        ...requestOptions.config,
      });
    }

    return response;
  } catch (error) {
    return catchHandle(error);
  }
};
