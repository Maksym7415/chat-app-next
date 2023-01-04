import socketIO from "socket.io-client/dist/socket.io";
// const io = require('socket.io-client/dist/socket.io');
import { REACT_APP_SOCKET_URL } from "../constants/url";

// export default socketIO(REACT_APP_SOCKET_URL, {
//   forceNew: true,
//   path: '/socket',
//   transports: ['websocket', 'polling'],
// });

export const socket = socketIO(REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
  path: "/socket",
  jsonp: false,
});

export const startSocketIO = (store) => {
  // socket.connect();
  // socket.on('connect', () => {
  //   console.log('connect');
  //   // const { userId } = store.getState().user;
  // });
  // socket.on('disconnect', () => {
  //   console.log('connection to server lost.');
  // });
  // socket.on('newMessage', message => {
  //   console.log(message, 'message');
  //   // store.dispatch(storePublicMessages([message]));
  // });
};
