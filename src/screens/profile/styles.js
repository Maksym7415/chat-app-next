import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  scrollView: {
    overflowY: "auto",
    paddingTop: 10,
  },
  wrapperSetPhoto: {
    backgroundColor: "#ffffff",
    padding: "11px 0 12px 11px",
    display: "flex",
    alignItems: "center",
  },
  setPhotoTitle: {
    marginLeft: 15,
    fontWeight: "400",
    fontSize: 14,
    color: "#4094D0",
  },
  bottomText: {
    textAlign: "center",
    marginVertical: 14,
    fontWeight: "400",
    fontSize: 12,
    color: "#9C9A9D",
  },
}));
