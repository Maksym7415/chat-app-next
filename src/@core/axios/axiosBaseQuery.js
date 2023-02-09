import Axios from "axios";
import API from "./index";

const getRequestConfig = (args) => {
  if (typeof args === "string") {
    return { url: args };
  }

  return args;
};

export const axiosBaseQuery = ({ prepareHeaders, meta, transformResponse }) => {
  return async (args, api, extraOptions) => {
    try {
      const requestConfig = getRequestConfig(args);

      // console.log(meta, "meta");
      // console.log(args, "args");
      // console.log(api, "api");
      // console.log(extraOptions, "extraOptions");

      const headers = prepareHeaders
        ? prepareHeaders(requestConfig.headers || {}, api)
        : requestConfig.headers;

      const result = await API({
        ...requestConfig,
        headers: {
          ...headers,
        },
        signal: api.signal,
        ...extraOptions,
      });

      return {
        data: transformResponse ? transformResponse(result.data) : result.data,
      };
    } catch (err) {
      if (!Axios?.isAxiosError(err)) {
        return {
          error: err,
          meta,
        };
      }

      return {
        error: {
          status: err?.response?.status || 0,
          data: err.response?.data || err?.message || "error",
        },
        meta,
      };
    }
  };
};

