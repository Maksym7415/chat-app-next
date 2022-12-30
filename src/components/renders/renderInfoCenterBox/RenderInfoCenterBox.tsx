import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

// need ts

const useStyles = makeStyles((theme) => ({
  wrapperInfoCenter: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const RenderInfoCenterBox = ({ children, styles }: any) => {
  // STYLES
  const classes = useStyles();

  return (
    <Box
      className={classes.wrapperInfoCenter}
      sx={{ width: "100%" }}
      style={styles}
    >
      {children}
    </Box>
  );
};

export default RenderInfoCenterBox;
