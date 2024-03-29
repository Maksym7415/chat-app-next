import { useMemo, useState, memo } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  headerChatDotsOptionsChat,
  headerChatDotsOptionsDialog,
} from "./config";
import { TYPES_CONVERSATIONS } from "@/core/constants/general";
import UserAvatar from "@/components/avatar/userAvatar";
import SvgMaker from "@/components/svgMaker";
import { setDrawerConfigAction } from "@/components/drawer/redux/slice";
import {
  actionsMessagesChat,
  actionsSelectedConversation,
  actionsTypeActionsChat,
  actionsTypeActionsConversation,
} from "@/actions/index";
import { store } from "@/store/store";

// STYLES
const classes = {
  container: "flex p-[16px] bg-white w-full",
  containerTop: "flex w-full",
  back: "mr-[30px]",
  wrapperConversationData: "flex flex-1",
  wrapperAvatar: "mr-[10px] cursor-pointer",
  title: "text-[17px] font-bold",
  subtitle: "text-[14px] font-normal",
  wrapperAction: "ml-[20px]",
  dotsOption: "flex py-[7px] px-[10px] w-full relative",
  wrapperIconOption: "mr-[10px]",
  options: "mr-[0px]",
};

const ChatHeader = ({
  conversationData,
  conversationId,
  typeConversation,
  messages,
}) => {
  // SELECTORS
  const selectedMessages = useSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const newChatData = useSelector(({ appSlice }) => appSlice.newChatData);

  // STATES
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // FUNCTIONS
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptions = async (action, levelNames) => {
    handleClose();

    if (action.type === "conversation") {
      return actionsSelectedConversation({
        typeAction: action.value,
        dataConversation: conversationData,
      });
    }

    return actionsMessagesChat({
      conversationId,
      typeAction: action.value,
    });
  };

  const headerСhatDotsOptions = useMemo(() => {
    let options = [];
    if (TYPES_CONVERSATIONS.dialog) {
      options = headerChatDotsOptionsDialog(lang);
    }
    if (TYPES_CONVERSATIONS.chat) {
      options = headerChatDotsOptionsChat(lang);
    }
    return options.filter((item) => {
      if (
        !messages.length &&
        [
          actionsTypeActionsChat.selectMessages,
          actionsTypeActionsConversation.clearChat,
        ].includes(item.value)
      ) {
        return false;
      }
      return true;
    });
  }, [typeConversation, messages]);

  // RENDERS
  const renderTopCenterComponent = () => {
    return (
      <div
        onClick={() => {
          store.dispatch(
            setDrawerConfigAction({
              anchor: "right",
              open: true,
              width: "400px",
              type: "profile",
              configContent: {
                typeProfile: conversationData.conversationType,
                conversationData,
              },
            })
          );
        }}
        className={classes.wrapperConversationData}
      >
        <div className={classes.wrapperAvatar}>
          <UserAvatar
            source={conversationData?.conversationAvatar}
            name={conversationData?.conversationName || "Test Test"}
            sizeAvatar={38}
          />
        </div>
        <div className={classes.wrapperAvatar}>
          <p className={classes.title}>{conversationData?.conversationName}</p>
          <span className={classes.subtitle}>{"Online*"}</span>
        </div>
      </div>
    );
  };

  const renderTopRightComponent = () => {
    return (
      <div className={clsx(classes.wrapperAction, classes.wrapperOptions)}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disabled={selectedMessages.active}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {headerСhatDotsOptions.map((action) => {
            const isSubMenu = action?.subMenu?.length && action.levelNames;
            return (
              <MenuItem
                key={action.id}
                className={classes.dotsOption}
                style={{
                  marginRight: isSubMenu ? 26 : 0,
                }}
                onClick={() => handleOptions(action, action.levelNames)}
              >
                {action.icon.name && (
                  <div className={classes.wrapperIconOption}>
                    <SvgMaker name={action.icon.name} />
                  </div>
                )}
                <p>{action.title}</p>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerTop}>
        {renderTopCenterComponent()}
        {newChatData.newChatId ? null : renderTopRightComponent()}
      </div>
    </div>
  );
};

export default memo(ChatHeader);
