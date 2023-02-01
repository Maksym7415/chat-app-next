import { parseStringJSON } from "@/helpers/index";
import Snackbar from "@/helpers/notistack";

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
  options?.cb && response?.data && options.cb(response?.data);
};
