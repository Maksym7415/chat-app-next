import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  wrapperItemAccount: {
    pointerEvent: "none",
  },
  title: {
    fontWeight: "400",
    fontSize: 15,
    color: "#202020",
  },
  subTitle: {
    marginTop: 6,
    fontWeight: "400",
    fontSize: 12,
    color: "#83868B",
  },

  wrapperItem: {
    paddingTop: 11,
    paddingBottom: 12,
    pointerEvent: "none",
    flexDirection: "row",
  },
  wrapperNotification: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  switchNotification: {},
  dividerNotification: {
    backgroundColor: theme.colors.gray_10,
    marginRight: 15,
  },
  divider: {
    flexDirection: "row",
    backgroundColor: theme.colors.gray_10,
  },
  wrapperList: {
    backgroundColor: "#ffffff",
    // marginTop: 12,
    // paddingTop: 19,
    paddingLeft: 21,
  },
  listTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#4094D0",
  },
  list: {
    marginTop: 9,
  },
}));
