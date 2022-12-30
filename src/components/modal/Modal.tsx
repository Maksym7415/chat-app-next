import * as React from "react";
import { Box, Typography, Backdrop, Modal, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "../reactSpring/fade";
import SettingProfile from "./components/settingProfile";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModalClearConfigAction } from "./redux/slice";

// need ts

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflow: "auto",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "20px",
  },
}));

const ModalComponent = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const modalConfig: any = useAppSelector(
    ({ modalSlice }) => modalSlice.modalConfig
  );

  // FUNCTIONS
  const handleClose = () => dispatch(setModalClearConfigAction());

  return (
    <Modal
      open={modalConfig.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalConfig.open}>
        <Box
          className={classes.container}
          style={modalConfig?.styles?.container}
        >
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: "0", top: "0" }}
          >
            <CloseIcon />
          </IconButton>
          {(() => {
            switch (modalConfig.renderContent) {
              case "settingProfile":
                return <SettingProfile />;
              default:
                return (
                  <Typography
                    id="spring-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Немає такої модалки
                  </Typography>
                );
            }
          })()}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
