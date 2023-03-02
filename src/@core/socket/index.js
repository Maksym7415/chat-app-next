import socketIO from "socket.io-client/dist/socket.io";
import { REACT_APP_SOCKET_URL } from "@/core/constants/url";

export const socket = socketIO(REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
  path: "/socket",
  jsonp: false,
});
