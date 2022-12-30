import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  wrapperItemLeft: {},
  title: {
    fontWeight: "400",
    fontSize: 15,
    color: "#202020",
    margin: 0,
  },
  subTitle: {
    marginTop: 6,
    fontWeight: "400",
    fontSize: 12,
    color: "#83868B",
  },

  wrapperItem: {
    padding: "12px 10px",
    pointerEvent: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));
