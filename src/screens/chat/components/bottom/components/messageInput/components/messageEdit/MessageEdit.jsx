import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SvgMaker from "@/components/svgMaker/index";
import languages from "@/core/translations/index";

// STYLES
const classes = {
  root: "bg-white flex px-[10px] py-[5px] border-b border-[#d1d1d1] items-center",
  wrapperIconEdit: "pr-[10px]",
  wrapperMainContent: "flex-1 pl-[15px]",
  close: "",
};

const MessageEdit = ({ data, onClose }) => {
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
