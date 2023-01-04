import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import shallow from "zustand/shallow";
import CloseIcon from "@mui/icons-material/Close";
import NewChat from "./components/newChat";
import ShareMessage from "./components/shareMessage";
import { useAppStore } from "@/storeZustand/app/store";

// STYLES
const classes = {
  closeIcon: "w-[30px] h-[30px]",
  closeIconButton: "w-[30px] h-[30px]",
  titleContainer: "w-full flex justify-between",
  title: "text-[1.3rem] block",
  dialogContent: "w-[400px] h-full relative p-[0px]",
};
const DialogComponent = () => {
  // HOOKS

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
