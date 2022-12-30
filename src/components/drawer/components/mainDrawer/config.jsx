import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const languagesList = [
  {
    id: 1,
    label: "en",
    value: "en",
  },
  {
    id: 2,
    label: "ua",
    value: "ua",
  },
  {
    id: 3,
    label: "ru",
    value: "ru",
  },
];

export const drawerList = [
  {
    id: 1,
    title: "Profile",
    icon: <PersonIcon />,
    value: "myProfile",
  },
  {
    id: 2,
    title: "New Chat",
    icon: <GroupIcon />,
    value: "newChat",
  },
  {
    id: 3,
    title: "Logout",
    icon: <ExitToAppIcon />,
    value: "logout",
  },
];
