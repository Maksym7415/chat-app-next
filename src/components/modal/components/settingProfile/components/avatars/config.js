import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const actionsPhoto = [
  {
    id: 1,
    title: "Add A Photo",
    icon: <AddAPhotoIcon />,
    value: "addAPhoto",
  },
  {
    id: 2,
    title: "set main Photo",
    icon: <CheckCircleIcon />,
    value: "setMainPhoto",
  },
  {
    id: 3,
    title: "Delete photo",
    icon: <DeleteIcon />,
    value: "deletePhoto",
  },
];
