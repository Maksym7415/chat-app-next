"use client";
// +

import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { SDRoot, SDIconButton } from "./styles";
import { allActionsStore } from "@/store/rootActions";
import SettingProfile from "./components/settingProfile";
import * as config from "./config";

// fix locale
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
			<SDRoot sx={modalConfig?.styles?.container}>
				<SDIconButton
					aria-label="close"
					onClick={handleClose}
				>
					<CloseIcon />
				</SDIconButton>
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
		</Modal>
	);
};

export default ModalComponent;
