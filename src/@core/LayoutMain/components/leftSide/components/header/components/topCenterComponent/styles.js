import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  inputSearch: {
    width: "100%",
    maxWidth: 240,
    padding: 0,
    borderRadius: "20px !important",
    paddingLeft: "5px !important",
    "& > input": {
      padding: "10px 15px",
    },
  },
}));
