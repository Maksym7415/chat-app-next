import axios from "axios";
import { BASE_URL } from "../constants/url";
import { getHeaders } from "../../helpers";
import { actionLogOut } from "../../actions";
import Snackbar from "@/helpers/notistack";
import { IS_CLIENT } from "@/core/constants/general";

const parseErrorCode = (error) => {
  console.log(error, "error");
  if (error.response) {
    // console.log(error.response, "error.response");
    if (error.response?._response) {
      alert(error.response?._response);
    }
    if (error.response.status === 401) {
      actionLogOut();
      // if (typeof window === "undefined") {
      //   throw new CustomError("actionLogOut"); //Throw custom error here
      // } else {
      //   window.location.href = "/sign-in";
      // }
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

  if (error.response) {
    return Promise.reject(error.response);
  }

  consol.log(error, "error");

  if (IS_CLIENT) {
    Snackbar.error(error.message);
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
