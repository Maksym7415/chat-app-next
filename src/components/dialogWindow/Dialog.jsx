import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import NewChat from "./components/newChat";
import ShareMessage from "./components/shareMessage";
import useStyles from "./styles";
import { setDialogWindowClearConfigAction } from "./redux/slice";
import { useAppStore } from "@/storeZustand/app/store";
import shallow from "zustand/shallow";

// need ts

const DialogComponent = () => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  const { dialogConfig, setDialogWindowClearConfigAction } = useAppStore(
    (state) => ({
      dialogConfig: state.dialogConfig,
      setDialogWindowClearConfigAction: state.setDialogWindowClearConfigAction,
    }),
    shallow
  );

  // FUNCTIONS
  const handleClose = () => setDialogWindowClearConfigAction();

  const Content = () => {
    switch (dialogConfig.typeContent) {
      case "newChat":
        return <NewChat />;
      case "shareMessage":
        return <ShareMessage data={dialogConfig.data} />;
      default:
        return <></>;
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={dialogConfig.open}
      PaperProps={{
        style: {
          overflow: "unset",
        },
      }}
    >
      <DialogTitle className={classes.titleContainer}>
        <Typography className={classes.title}>{dialogConfig.title}</Typography>
        <IconButton
          size="large"
          className={classes.closeIconButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
