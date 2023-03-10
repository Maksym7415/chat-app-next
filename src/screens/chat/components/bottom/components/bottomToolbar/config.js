import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import languages from "@/core/translations/index";
import { actionsTypeActionsChat } from "@/core/constants/actions";

export const actionsMessagesToolbar = (lang) => [
  {
    id: 1,
    title: "Forward",
    value: actionsTypeActionsChat.forwardMessage,
    iconComponent: <ArrowForwardIcon />,
  },
  {
    id: 2,
    title: "Copy",
    value: actionsTypeActionsChat.copyMessage,
    iconComponent: <FileCopyOutlinedIcon />,
  },
  {
    id: 3,
    title: "Remove",
    value: actionsTypeActionsChat.deleteMessages,
    iconComponent: <DeleteOutlineOutlinedIcon />,
  },
];
