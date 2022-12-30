import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: "10px 20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  wrapperContact: {
    display: "flex",
    alignItems: "center",
    padding: "10px 5px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  wrapperInfo: {
    paddingLeft: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fullName: {
    fontSize: 16,
    margin: 0,
  },
  login: {
    margin: 0,
    marginTop: 3,
    fontSize: 12,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  avatarView: {},
  createChatButton: {
    maxWidth: 200,
    margin: "10px auto 0",
  },

  containerSelect: {
    "& .css-15txv13-control": {
      maxHeight: "200px",
      overflowY: "auto",
    },
  },
}));
