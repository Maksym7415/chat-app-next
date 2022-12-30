import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import ImagesProfile from "../../../../components/carousel/imagesProfile";
import {
  useAppStoreDispatch,
  useAppStoreSelector,
} from "../../../../hooks/redux";

import DefaultAvatar from "../../../../components/avatar/defaultAvatar/";

// need ts
// rework avatars

//test
const imagesTest = [
  {
    id: 1,
    src: "https://swiperjs.com/demos/images/nature-1.jpg",
  },
  {
    id: 2,
    src: "https://swiperjs.com/demos/images/nature-2.jpg",
  },
  {
    id: 3,
    src: "https://swiperjs.com/demos/images/nature-3.jpg",
  },
  {
    id: 4,
    src: "https://swiperjs.com/demos/images/nature-4.jpg",
  },
];

const Header = ({ setting, closeDrawer }: any) => {
  // HOOKS
  const dispatch = useAppStoreDispatch();

  // STYLES
  const classes = useStyles();

  // SELECTORS
  const userAvatars: any = useAppStoreSelector(
    ({ userSlice }) => userSlice.avatars
  );
  const lang = useAppStoreSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [images, setImages] = React.useState([]);

  // USEEFFECTS
  React.useEffect(() => {
    setting.avatar &&
      !images.length &&
      setImages([{ id: 1, fileName: setting.avatar }]);
  }, [setting.avatar]);

  React.useEffect(() => {
    if (
      JSON.stringify(userAvatars.data) !== JSON.stringify(images) &&
      userAvatars.length &&
      setting.isOwnerProfile
    ) {
      setImages(userAvatars);
    }
  }, [userAvatars]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.containerTop}>
          <IconButton
            onClick={closeDrawer}
            size="large"
            className={classes.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <ImagesProfile
            images={imagesTest}
            noImagesComponent={() => (
              <DefaultAvatar
                name={setting.nameShort}
                width={"100%"}
                height={"300px"}
                fontSize={"150px"}
                isSquare={true}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
