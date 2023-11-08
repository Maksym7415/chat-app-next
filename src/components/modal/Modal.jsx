import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, IconButton, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SDRoot } from "./styles";
import { allActionsStore } from "@/store/rootActions";
import SettingProfile from "./components/settingProfile";
import * as config from "./config";

const ModalComponent = () => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const modalConfig = useSelector(({ appSlice }) => appSlice.modalConfig);

	// FUNCTIONS
	const handleClose = () =>
		dispatch(allActionsStore.setModalClearConfigAction());

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
			<SDRoot sx={modalConfig?.styles?.container}>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					style={{ position: "absolute", right: "0", top: "0" }}
				>
					<CloseIcon />
				</IconButton>
				{(() => {
					const contentVariant = {
						[config.typeContent.settingProfile]: <SettingProfile />,
					};

					return (
						contentVariant?.[modalConfig.renderContent] || (
							<Typography
								id="spring-modal-title"
								variant="h6"
								component="h2"
							>
								Немає такої модалки
							</Typography>
						)
					);
				})()}
				;
			</SDRoot>
			{/* </Fade> */}
		</Modal>
	);
};

export default ModalComponent;
