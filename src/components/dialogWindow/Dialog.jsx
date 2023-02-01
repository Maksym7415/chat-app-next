import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import NewChat from "./components/newChat";
import ShareMessage from "./components/shareMessage";
import { setDialogWindowClearConfigAction } from "./redux/slice";
import { useState } from "react";
import { useEffect } from "react";

// STYLES
const classes = {
  closeIcon: "w-[30px] h-[30px]",
  closeIconButton: "w-[30px] h-[30px]",
  titleContainer: "w-full flex justify-between",
  title: "text-[1.3rem] block",
  dialogContent: "w-[400px] h-full relative p-[0px] overflow-visible",
};

const transitionDuration = 700;

const DialogComponent = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const dialogConfig = useSelector(
    ({ dialogWindowSlice }) => dialogWindowSlice.dialogConfig
  );

  const [open, setOpen] = useState(false)

  // FUNCTIONS
  const handleClose = () => {
    setOpen(false)

    const closeDialogTime = setTimeout(() => {
      dispatch(setDialogWindowClearConfigAction());
      clearTimeout(closeDialogTime)
    }, transitionDuration);
  }

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

  useEffect(()=> {
    if(dialogConfig.open !== open) {
      setOpen(dialogConfig.open)
    }
  }, [dialogConfig.open])


  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          overflow: "unset",
        },
      }}
      transitionDuration={transitionDuration}
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
