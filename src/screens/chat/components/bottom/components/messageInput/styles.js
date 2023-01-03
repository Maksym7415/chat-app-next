import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  wrapperInput: {
    flex: 1,
    // height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    // borderBottomColor: 'transparent',
    backgroundColor: "#ffffff",
    // backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "#ffffff",
    display: "flex",
    flex: 1,
    padding: "0 10px",
    margin: 0,
    maxHeight: 100,
  },
  attachAndTypeMessage: {
    display: "flex",
    height: "100%",
    backgroundColor: "#ffffff",
    paddingRight: 13,
    paddingLeft: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperInputShadow: {
    shadowColor: "#d1d1d1",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
}));
