import { Box, Typography, Backdrop, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import Fade from "../reactSpring/fade/Fade";
import SettingProfile from "./components/settingProfile";
import { setModalClearConfigAction } from "./redux/slice";

// rework fade

// STYLES
const classes = {
  container:
    "absolute w-max-[90vw] h-max-[90vh] overflow-auto bg-white p-[10px] rounded-[20px] top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4",
};

const ModalComponent = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const modalConfig = useSelector(({ modalSlice }) => modalSlice.modalConfig);

  // FUNCTIONS
  const handleClose = () => dispatch(setModalClearConfigAction());

  
  // const { mounted } = useMount({ opened });
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
      {/* <Fade in={modalConfig.open}> */}
      <Box className={classes.container} style={modalConfig?.styles?.container}>
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
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  Немає такої модалки
                </Typography>
              );
          }
        })()}
      </Box>
      {/* </Fade> */}
    </Modal>
  );
};

export default ModalComponent;
