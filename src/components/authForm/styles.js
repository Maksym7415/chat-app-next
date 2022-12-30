import { makeStyles } from "@mui/styles";
import { errorText } from "../../config/globalStyles";

export default makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  wrapperForm: {
    marginTop: 16,
    maxWidth: 300,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    width: "100%",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    marginTop: 16,
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer",
  },
  error: {},
  errorText: {
    ...errorText,
    marginTop: 10,
    fontSize: theme.font_size_medium,
  },
}));
