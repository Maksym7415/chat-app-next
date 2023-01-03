"use client";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import SvgMaker from "@/components/svgMaker/index";
import languages from "@/config/translations/index";

// need ts

const MessageEdit = ({ data, onClose }) => {
  //HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <div className={classes.root}>
      <div className={classes.wrapperIconEdit}>
        <SvgMaker name={"svgs_filled_pencil"} />
      </div>
      <div className={classes.wrapperMainContent}>
        <p>{languages[lang].generals.editMessage}</p>
        <p className="conversations__edit-message-paragraph">
          {data.message.message}
        </p>
      </div>
      <div className={classes.close}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageEdit;
