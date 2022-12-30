import { makeStyles } from "@mui/styles";

import { errorText } from "../../../config/globalStyles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  textViewError: {
    borderWidth: 1,
    // borderColor: theme.color_danger_900,
    borderRadius: 4,
    marginTop: 8,
  },
  label: {
    color: "#000000",
    paddingBottom: 6,
    fontSize: "24",
    fontWeight: "500",
  },
  errorLabel: {
    ...errorText,
    textAlign: "center",
    paddingTop: 2,
  },
  inputStyle: {
    width: "100%",
    fontSize: 20,
    color: "#000000",
    backgroundColor: "transparent",
  },
  errorInputStyle: {
    fontSize: "24",
    color: "#000000",
  },
}));
