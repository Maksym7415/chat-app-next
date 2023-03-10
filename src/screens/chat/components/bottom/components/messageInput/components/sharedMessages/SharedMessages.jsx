import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import languages from "@/core/translations";
import SvgMaker from "@/components/svgMaker";
import { shareMessageAction } from "@/store/app/slice";

// STYLES
const classes = {
  root: "bg-white flex px-[10px] py-[5px] border-b border-[#d1d1d1] items-center",
  wrapperLeft: "pr-[10px]",
  wrapperCenter: "flex-1",
  wrapperRight: "pl-[10px]",
  title: "text-[#517DA2] font-medium text-[16px]",
};

const SharedMessages = ({ forwardMessages }) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  // FUNCTIONS
  const handleClose = () => {
    dispatch(shareMessageAction({}));
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapperLeft}>
        <SvgMaker name="svgs_filled_send_arrow" />
      </div>
      <div className={classes.wrapperCenter}>
        <p className={classes.title}>
          {forwardMessages.length
            ? `Forward ${forwardMessages.length} ${
                forwardMessages.length > 1 ? "messages" : "message"
              }`
            : languages[lang].generals.shareMessage}
        </p>
        <p className="conversations__edit-message-paragraph">
          {(() => {
            if (forwardMessages.length < 2) {
              return forwardMessages[0].message;
            }

            let usersSharedMessages = forwardMessages?.reduce((acc, item) => {
              if (acc.includes(item.User.firstName)) return acc;
              return [...acc, item.User.firstName];
            }, []);

            if (forwardMessages.length > 2) {
              return `from ${usersSharedMessages[0]} and ${
                usersSharedMessages.length - 1
              } more`;
            } else {
              return `from ${usersSharedMessages[0]}${
                usersSharedMessages?.[1] ? `, ${usersSharedMessages?.[1]}` : ""
              }`;
            }
          })()}
        </p>
      </div>
      <div className={classes.wrapperRight}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SharedMessages;
