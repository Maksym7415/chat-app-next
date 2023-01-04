"use client";
import shallow from "zustand/shallow";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import SvgMaker from "@/components/svgMaker/index";
import languages from "@/core/translations/index";
import { useSettingStore } from "@/storeZustand/setting/store";

// need ts

const MessageEdit = ({ data, onClose }) => {
  //HOOKS
  const classes = useStyles();

  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

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
