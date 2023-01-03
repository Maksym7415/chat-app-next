import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "grid",
    columnGap: "5px",
    padding: "5px 5px",
  },
  wrapper: {
    boxSizing: "border-box",
  },
  wrapperUp: {
    display: "flex",
    position: "relative",
  },

  paperSharedMessage: {
    backgroundColor: "#d6f6e3",
  },
  wrapperTextMessageShared: {
    position: "relative",
    padding: "0 10px",
    // paddingTop: 10,
  },
  paperSenderMessage: {
    boxSizing: "border-box",
    // position: "relative",
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    // backgroundColor: theme.colors.green_light1,
    backgroundColor: "green",
    // padding: "15px",
    // marginLeft: 40,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "flex-end",
  },
  edited: {
    textAlign: "right",
    // padding: 0,
    // margin: 0,
    fontSize: 9,
  },
  paperFriendMessage: {
    position: "relative",
    // padding: "15px",
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    // alignSelf: "flex-start",
    // backgroundColor: theme.colors.white1,
    backgroundColor: "white",
    borderRadius: 10,
    // overflow: "hidden",
  },
  wrapperName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapperDate: {
    // paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  name: {
    color: "#000000",
  },
  messageSendTime: {
    color: "#000000",
  },
  messageText: {
    color: "#000000",
    // overflow: "hidden",
    wordBreak: "keep-all",
  },
  wrapperMessageUserName: {
    color: "#000000",
    fontWeight: "600",
  },
  selectedMessages: {
    backgroundColor: "rgba(132, 202, 254, 0.2)",
  },
  divider: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "green",
    width: 3,
    height: "100%",
  },

  wrapperFile: {
    // backgroundColor: 'red',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  messageSelectControl: {
    display: "flex",
    alignSelf: "flex-end",
    border: "2px solid #ffffff",
    borderRadius: "50%",
  },
  messageSelected: {
    backgroundColor: "#00C73E",
    padding: 2,
    "&:hover": {
      backgroundColor: "#00C73E",
    },
  },
  messageSelectedIcon: {
    width: 18,
    height: 18,
    color: "#ffffff",
  },

  wrapperSendData: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  sendDataText: {
    maxWidth: 125,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "7px 1px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#fffefeb5",
    borderRadius: 10,
    overflow: "hidden",
  },
}));
