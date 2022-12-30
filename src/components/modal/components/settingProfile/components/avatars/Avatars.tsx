import React from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  ListItem,
  List,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSnackbar } from "notistack";
import SwipeableViews from "react-swipeable-views";
import useStyles from "./styles";
import DefaultAvatar from "../../../../../avatar/defaultAvatar/";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import {
  getUserAvatars,
  setMainPhotoRequest,
  deleteAvatarRequest,
} from "../../../../../../reduxToolkit/user/requests";
import * as config from "./config";
import { getNameShort } from "../../../../../../helpers";

const ITEM_HEIGHT = 30;

const Avatars = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userAvatars: any = useAppSelector(({ userSlice }) => userSlice.avatars);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [photoIndexSelected, setPhotoIndexSelected] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [avatars, setAvatars] = React.useState([]);
  const [mainAvatar, setMainAvatar] = React.useState<any>({});
  const open = Boolean(anchorEl);

  // FUNCTIONS
  const handleChangeIndex = (indexSelected, direction) => {
    let index = indexSelected;
    if (direction === "left") {
      indexSelected > 0 ? (index = indexSelected - 1) : null;
    }
    if (direction === "right") {
      indexSelected < avatars.length - 1 ? (index = indexSelected + 1) : null;
    }
    setPhotoIndexSelected(index);
  };

  const handleMenuAction = (value: string) => {
    handleClose();
    const photoSelected = avatars[photoIndexSelected];
    switch (value) {
      case "addAPhoto":
        // const file: FileList | null = event.target.files;
        // const formData = new FormData();
        // if (file) {
        //   formData.append("file", file[0]);
        //   // dispatch(uploadAvatarAction(formData));
        // }
        return;
      case "setMainPhoto":
        dispatch(
          setMainPhotoRequest({
            photoId: photoSelected.id,
            params: {
              url: photoSelected.fileName,
            },
            cb: () => {
              enqueueSnackbar("Success set main photo", { variant: "success" });
              setMainAvatar(photoSelected);
            },
          })
        );
        return;
      case "deletePhoto":
        dispatch(
          deleteAvatarRequest({
            params: {
              id: photoSelected.id,
            },
            cb: () => dispatch(getUserAvatars({})),
          })
        );
        return;
      default:
        return null;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // USEEFFECTS
  React.useLayoutEffect(() => {
    if (
      JSON.stringify(userAvatars.data) !== JSON.stringify(avatars) &&
      userAvatars.length
    ) {
      const findMainAvatar = userAvatars.find((item) => item.defaultAvatar);
      findMainAvatar && setMainAvatar(findMainAvatar);
      setAvatars(userAvatars);
    }
  }, [userAvatars]);

  React.useLayoutEffect(() => {
    if (!userAvatars.length) {
      dispatch(getUserAvatars({}));
    }
  }, []);

  if (!userAvatars.length) {
    const sizeAvatar = "300";
    const fullName: any =
      userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`;
    const nameShort = fullName ? getNameShort(fullName) : null;

    return (
      <div className={classes.container}>
        <div className={classes.wrapperAvatar}>
          <DefaultAvatar
            name={nameShort}
            width={`${sizeAvatar}px`}
            height={`${sizeAvatar}px`}
            fontSize={"100px"}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <SwipeableViews
          index={photoIndexSelected}
          onChangeIndex={handleChangeIndex}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "300px",
            borderRadius: "50%",
          }}
        >
          {avatars.map((item, index) => {
            return (
              <div key={index} className={classes.wrapperAvatar}>
                <Avatar
                  src={`${process.env.REACT_APP_BASE_URL}/${item.fileName}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            );
          })}
        </SwipeableViews>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            position: "absolute",
            right: "0",
            top: "0",
          }}
        >
          <MoreVertIcon />
        </IconButton>
        {avatars[photoIndexSelected]?.id === mainAvatar?.id && (
          <IconButton
            color="primary"
            component="span"
            style={{
              position: "absolute",
              left: "0",
              top: "0",
            }}
          >
            <CheckCircleIcon fontSize="medium" />
          </IconButton>
        )}
        <>
          <IconButton
            color="primary"
            component="button"
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => {
              handleChangeIndex(photoIndexSelected, "left");
            }}
          >
            <ArrowLeftIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            component="button"
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => {
              handleChangeIndex(photoIndexSelected, "right");
            }}
          >
            <ArrowRightIcon fontSize="large" />
          </IconButton>
        </>
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <List className={classes.list}>
          {config.actionsPhoto.map(({ icon, id, title, value }) => {
            if (
              mainAvatar?.id === avatars[photoIndexSelected]?.id &&
              value === "setMainPhoto"
            )
              return;
            return (
              <ListItem
                key={id}
                onClick={() => handleMenuAction(value)}
                className={classes.listItem}
              >
                <ListItemIcon
                  className={classes.itemIcon}
                  style={{ minWidth: 0 }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            );
          })}
        </List>
      </Menu>
    </>
  );
};

export default Avatars;
