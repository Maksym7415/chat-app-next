import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const actionsPhoto = [
	{
		id: 1,
		title: "addAPhoto",
		icon: <AddAPhotoIcon />,
		value: "addAPhoto",
	},
	{
		id: 2,
		title: "setMainPhoto",
		icon: <CheckCircleIcon />,
		value: "setMainPhoto",
	},
	{
		id: 3,
		title: "deletePhoto",
		icon: <DeleteIcon />,
		value: "deletePhoto",
	},
];
