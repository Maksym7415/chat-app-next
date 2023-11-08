import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const actionsPhotoKeysData = {
	addAPhoto: {
		key: "addAPhoto",
		id: 1,
		title: "addAPhoto",
		icon: <AddAPhotoIcon />,
		value: "addAPhoto",
	},
	setMainPhoto: {
		key: "setMainPhoto",
		id: 2,
		title: "setMainPhoto",
		icon: <CheckCircleIcon />,
		value: "setMainPhoto",
	},
	deletePhoto: {
		key: "deletePhoto",
		id: 3,
		title: "deletePhoto",
		icon: <DeleteIcon />,
		value: "deletePhoto",
	},
};

export const actionsPhoto = [
	actionsPhotoKeysData.addAPhoto,
	actionsPhotoKeysData.setMainPhotosetMainPhoto,
	actionsPhotoKeysData.deletePhoto,
];
