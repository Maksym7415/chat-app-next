import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    minHeight: 82,
    padding: "10px 5px",
    borderRadius: "20px",
    cursor: "pointer",
    marginTop: "5px",
    "&:first-child": {
      marginTop: 0,
    },
    "&:hover": {
      backgroundColor: "#dfe7f4",
    },
  },
  wrapperTop: {
    display: "flex",
    justifyContent: "space-between",
  },
  wrapperTopRight: {
    display: "flex",
  },
  wrapperTopRightStatus: {
    marginRight: 1,
  },
  time: {
    fontWeight: "400",
    fontSize: 13,
    // color
    color: "#95999A",
  },
  selectedChat: {
    backgroundColor: "red",
  },
  dataView: {
    display: "flex",
  },
  wrapperBody: {
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    // color
    color: "#222222",
  },
  avatarView: {
    marginRight: 10,
  },
  whoSenderName: {
    fontWeight: "500",
    fontSize: 14.7778,
    margin: 0,
    // color
    color: "#434449",
  },

  message: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerMessage: {},
  messageText: {
    fontWeight: "400",
    fontSize: 15,
    margin: 0,
    // color
    color: "#8D8E90",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  numberOfUnreadMessages: {
    marginLeft: 5,
    // color
    backgroundColor:
      // data.conversationType !== "Dialog"
      //   ? theme.colors.steel_gray_6
      //   :
      "#00C73E",
    color: "#ffffff",
  },
  wrapperTopLeft: {},
  activeConversation: {
    backgroundColor: "#dfe7f4",
  },
}));
