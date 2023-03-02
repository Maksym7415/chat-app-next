import axios from "axios";
import { BASE_URL } from "@/core/constants/url";
import { IS_CLIENT } from "@/core/constants/general";
import { getHeaders } from "@/helpers/index";
import Snackbar from "@/helpers/notistack";
import { actionLogOut } from "@/actions/index";

const parseErrorCode = (error) => {
  console.log(error, "error");
  if (error?.response) {
    if (error.response?._response) {
      alert(error.response?._response);
    }
    if (error.response.status === 401) {
      actionLogOut(true);
    } else if (error.response.status === 404) {
      const { message } = error.response.data;

      return Promise.reject({
        data: {
          message: message || error.response.data,
        },
      });
    }
  } else {
    // error something
  }

  if (error?.response) {
    return Promise.reject(error.response);
  }

  if (IS_CLIENT) {
    Snackbar.error(error.message);
    return Promise.reject({
      data: {
        message: error.message,
      },
    });
  } else {
    return Promise.reject({
      data: {
        message: error.message,
      },
    });
  }
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async (config) => {
    const headers = await getHeaders();

    config.baseURL = BASE_URL;
    config.timeout = 10000;
    if (headers) {
      config.headers = {
        common: {
          ["Content-Type"]: "application/json",
          accept: "application/json",
          ["X-Requested-With"]: "XMLHttpRequest",
        },
        ...headers,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response parsing interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
);

export default API;
