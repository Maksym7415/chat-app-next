import axios from "axios";
import { BASE_URL } from "../constants/url";
import { getHeaders } from "../../helpers";
import { actionLogOut } from "../../actions";

const parseErrorCode = (error) => {
  if (error.response) {
    // console.log(error.response, "error.response");
    if (error.response?._response) {
      alert(error.response?._response);
    }
    if (error.response.status === 401) {
      // actionLogOut();
    } else if (error.response.status === 404) {
      const { message } = error.response.data;
    }
  } else {
    // error something
  }

  return Promise.reject(error.response);
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
