import * as React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapperInfoCenter: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const RenderInfoCenterBox = ({ children, styles }) => {
  // STYLES
  const classes = useStyles();

  return (
    <div className={classes.wrapperInfoCenter} style={styles}>
      {children}
    </div>
  );
};

export default RenderInfoCenterBox;
