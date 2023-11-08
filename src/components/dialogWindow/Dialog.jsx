import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SDDialogTitle,
	SDDialogContent,
	SDTitle,
	SDIconButton,
} from "./styles";
import NewChat from "./components/newChat";
import ShareMessage from "./components/shareMessage";
import { allActionsStore } from "@/store/rootActions";


const transitionDuration = 700;

const DialogComponent = () => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const dialogConfig = useSelector(({ appSlice }) => appSlice.dialogConfig);

	// STATES
	const [open, setOpen] = useState(false);

	// FUNCTIONS
	const handleClose = () => {
		setOpen(false);

		const closeDialogTime = setTimeout(() => {
			dispatch(allActionsStore.setDialogWindowClearConfigAction());
			clearTimeout(closeDialogTime);
		}, transitionDuration);
	};

	// USEEFFECTS
	useEffect(() => {
		if (dialogConfig.open !== open) {
			setOpen(dialogConfig.open);
		}
	}, [dialogConfig.open]);

	// RENDERS
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
			open={open}
			PaperProps={{
				style: {
					overflow: "unset",
				},
			}}
			transitionDuration={transitionDuration}
		>
			<SDDialogTitle>
				<SDTitle>{dialogConfig.title}</SDTitle>
				<SDIconButton
					size="large"
					onClick={handleClose}
				>
					<CloseIcon />
				</SDIconButton>
			</SDDialogTitle>
			<SDDialogContent>
				<Content />
			</SDDialogContent>
		</Dialog>
	);
};

export default DialogComponent;
