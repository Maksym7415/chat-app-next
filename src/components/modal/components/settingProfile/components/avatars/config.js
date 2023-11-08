import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const actionsPhotoKeysData = {
	addAPhoto: {
		key: "addAPhoto",
		id: 1,
		title: "addAPhoto",
		icon: <AddAPhotoIcon />,
	},
	setMainPhoto: {
		key: "setMainPhoto",
		id: 2,
		title: "setMainPhoto",
		icon: <CheckCircleIcon />,
	},
	deletePhoto: {
		key: "deletePhoto",
		id: 3,
		title: "deletePhoto",
		icon: <DeleteIcon />,
	},
};

export const actionsPhoto = [
	actionsPhotoKeysData.addAPhoto,
	actionsPhotoKeysData.setMainPhoto,
	actionsPhotoKeysData.deletePhoto,
];
