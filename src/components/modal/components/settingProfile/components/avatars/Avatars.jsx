import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  ListItem,
  List,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSnackbar } from "notistack";
import DefaultAvatar from "../../../../../avatar/defaultAvatar";
import * as config from "./config";
import { getNameShort } from "../../../../../../helpers";
import { REACT_APP_BASE_URL } from "@/core/constants/url";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import {
  GetUserAvatarsQuery,
  getUserAvatarsQuery,
  PutMainPhotoQuery,
  DeleteAvatarQuery,
} from "@/services/user/service";

// style

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";

// STYLES
const classes = {
  container: "relative",
  wrapperAvatar: "p-[2px]",
  wrapperlangs: "p-[15px]",
  listItem: "w-full cursor-pointer",
  itemIcon: "mr-[15px]",
};

const Avatars = () => {
  // HOOKS
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading: isLoadingAvatars } = GetUserAvatarsQuery({});

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userAvatars = useSelector(({ userSlice }) => userSlice.avatars);
  const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

  // STATES
  const [photoIndexSelected, setPhotoIndexSelected] = useState(0);
  const [anchorEl, setAnchorEl] = useState();
  const [avatars, setAvatars] = useState([]);
  const [mainAvatar, setMainAvatar] = useState({});
  const open = Boolean(anchorEl);

  const { mutate: mutatePutMainPhoto } = PutMainPhotoQuery({
    additionalUrl: avatars[photoIndexSelected]?.id || "",
    params: {
      url: avatars[photoIndexSelected]?.fileName,
    },
    cb: async () => {
      await getUserAvatarsQuery();
      enqueueSnackbar("Success set main photo", { variant: "success" });
    },
  });
  const { mutate: mutateDeleteAvatar } = DeleteAvatarQuery({
    params: {
      id: avatars[photoIndexSelected]?.id,
    },
    cb: async () => {
      await getUserAvatarsQuery();
      enqueueSnackbar("Success delete photo", { variant: "success" });
    },
  });

  // FUNCTIONS
  const handleMenuAction = (value) => {
    handleClose();

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
        mutatePutMainPhoto();
        return;
      case "deletePhoto":
        mutateDeleteAvatar();
        return;
      default:
        return null;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // USEEFFECTS
  useEffect(() => {
    if (
      JSON.stringify(userAvatars.data) !== JSON.stringify(avatars) &&
      userAvatars.length
    ) {
      const findMainAvatar = userAvatars.find((item) => item.defaultAvatar);
      findMainAvatar && setMainAvatar(findMainAvatar);
      setAvatars(userAvatars);
    }
  }, [userAvatars]);

  if (isLoadingAvatars) {
    return (
      <RenderInfoCenterBox styles={{ height: "300px", width: "300px" }}>
        <CircularProgress size={100} />
      </RenderInfoCenterBox>
    );
  }

  if (!userAvatars.length) {
    const sizeAvatar = "300";
    const fullName =
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
        <Swiper
          navigation={true}
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          style={{
            width: "300px",
            height: "300px",
            maxWidth: "300px",
            maxHeight: "300px",
          }}
          onRealIndexChange={(element) =>
            setPhotoIndexSelected(element.activeIndex)
          }
        >
          {avatars?.length ? (
            avatars?.map((item) => {
              return (
                <SwiperSlide key={item.id} style={{ display: "flex" }}>
                  <Image
                    src={`${REACT_APP_BASE_URL}/${item.fileName}`}
                    width={1000}
                    height={300}
                    alt="Picture of the author"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <></>
          )}
        </Swiper>
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
            zIndex: 2,
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
              zIndex: 2,
            }}
          >
            <CheckCircleIcon fontSize="medium" />
          </IconButton>
        )}
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <List className={classes.list}>
          {config.actionsPhoto.map(({ icon, id, title, value }) => {
            if (
              avatars[photoIndexSelected]?.id === mainAvatar?.id &&
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
