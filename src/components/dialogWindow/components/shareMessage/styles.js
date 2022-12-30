import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: "10px",
    width: "100%",
    minHeight: "50vh",
    maxHeight: "60vh",
    position: "relative",
    overflow: "hidden",
  },
  conversation: {
    display: "flex",
    marginTop: theme.spacing(1),
    borderRadius: 10,
    transition: ".2s",
    "&:hover": {
      backgroundColor: "#b9e6e1",
      cursor: "pointer",
    },
  },
  name: {
    fontWeight: 700,
    lineHeight: "inherit",
  },
  messageText: {
    maxWidth: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  inputFilter: {
    width: "100%",
  },
  wrapperConversation: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    height: "100%",
    marginTop: theme.spacing(1),
  },
  noUsersFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noUsersFoundText: {
    fontSize: 24,
    fontWeight: 600,
  },
  info: {
    marginLeft: 10,
  },
}));
