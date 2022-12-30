import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    zIndex: 2,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  containerTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "5px 10px",
    // backgroundColor: theme.colors.main,
  },

  content: {
    position: "relative",
    // backgroundColor: theme.colors.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    "& svg": {
      "& path": {
        // stroke: "#ffffff",
        // fill: "#ffffff",
      },
    },
  },
}));
