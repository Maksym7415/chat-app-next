import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { actionsTypeActionsChat } from "@/actions/index";

export const selectedMessageContext = (lang) => [
  {
    id: 1,
    title: "Edit",
    value: actionsTypeActionsChat.editMessage,
    iconComponent: <EditIcon />,
    self: true,
  },
  {
    id: 2,
    title: "Forward",
    value: actionsTypeActionsChat.forwardMessage,
    iconComponent: <ArrowForwardIcon />,
  },
  {
    id: 3,
    title: "Copy",
    value: actionsTypeActionsChat.copyMessage,
    iconComponent: <FileCopyOutlinedIcon />,
  },
  {
    id: 4,
    title: "Select message",
    value: actionsTypeActionsChat.selectMessages,
    iconComponent: <CheckCircleOutlineIcon />,
  },
  {
    id: 5,
    title: "Remove",
    value: actionsTypeActionsChat.deleteMessages,
    iconComponent: <DeleteOutlineOutlinedIcon />,
  },
];
