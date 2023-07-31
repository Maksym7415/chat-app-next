import socketIO from "socket.io-client/dist/socket.io";

export const socket = socketIO(process.env.BASE_URL_SOCKET, {
	transports: ["websocket"],
	path: "/socket",
	jsonp: false,
});
