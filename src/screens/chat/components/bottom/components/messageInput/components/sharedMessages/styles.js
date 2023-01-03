import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },
  wrapperLeft: {
    paddingRight: 10,
  },
  wrapperCenter: {
    flex: 1,
  },
  wrapperRight: {
    paddingLeft: 10,
  },
  title: {
    color: theme.colors.main,
    fontWeight: "500",
    fontSize: 16,
  },
}));
