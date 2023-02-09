import { parseStringJSON } from "@/helpers/index";
import Snackbar from "@/helpers/notistack";
import { IS_SERVER, IS_CLIENT } from "@/core/constants/general";

export const standardOnError = ({ error, options }) => {
  const errorLoc = parseStringJSON(error?.message);

  if (errorLoc?.data) {
    options?.errorCb
      ? options.errorCb(errorLoc.data)
      : Snackbar.error(errorLoc.data?.message || "");
  } else {
    Snackbar.error("Помилка в коді або щось інше");
  }
};

export const standardOnSuccess = ({ response, options }) => {
  options?.cb &&
    typeof response?.data !== "undefined" &&
    options.cb(response?.data);
};

// redux createApi
export const fErrorResponse = ({ response, meta, args }) => {
  if (IS_SERVER) {
    return response;
  }

  if (!response.data.message && typeof response.data === "string") {
    Snackbar.error(response.data);
    return null;
  }
  console.log(response, "fErrorResponse");
  // Snackbar.error(response.data);

  return response;
};

export const onQueryStartedFulfilled = async ({ options, cb }) => {
  try {
    const response = await options.queryFulfilled;
    if (cb) {
      cb(response);
    } else {
      Snackbar.error("Помилка в onQueryStartedFulfilled - немає cb");
    }
  } catch (err) {
    console.dir(err);
    err.message && Snackbar.error(err.message + " in onQueryStartedFulfilled");
  }
};

export const onQueryStartedFulfilledCb = async ({ propsData, data }) => {
  try {
    propsData?.cb && IS_CLIENT && propsData.cb(data);
  } catch (err) {
    console.dir(err);
    err.message &&
      Snackbar.error(err.message + " in onQueryStartedFulfilledCb");
  }
};

export const parseErrorResToType = ({ error, getType = "string" }) => {
  const errorMessage = error?.data?.message;

  if (!errorMessage) {
    return null;
  }

  if (getType === "string") {
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
    return "Error";
  }

  Snackbar.error("Помилка в parseErrorResToType");

  return null;
};
