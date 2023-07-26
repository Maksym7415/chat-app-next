/* eslint-disable import/no-anonymous-default-export */
import { toast } from "react-toastify";

const options = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};

export default {
	success(msg) {
		toast.success(msg, options);
	},
	warning(msg) {
		toast.warn(msg, options);
	},
	info(msg) {
		toast.info(msg, options);
	},
	error(msg) {
		toast.error(msg, options);
	},
};
