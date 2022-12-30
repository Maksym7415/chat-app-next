/* eslint-disable no-return-assign */
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Paths } from "../../../../routing/config/paths";

// need ts

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
    route: Paths.main,
    icon: <PersonIcon />,
    value: "myProfile",
  },
  {
    id: 2,
    title: "New Chat",
    route: Paths.main,
    icon: <GroupIcon />,
    value: "newChat",
  },
  {
    id: 3,
    title: "Logout",
    route: Paths.signIn,
    icon: <ExitToAppIcon />,
    value: "logout",
  },
];
