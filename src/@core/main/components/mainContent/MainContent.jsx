"use client";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { PATHS } from "@/config/constants/paths";
// import Chat from "../../../chat";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import languages from "@/config/translations";

// STYLES
const useStyles = makeStyles((theme) => ({
  chooseAChatText: {
    fontSize: 28,
    fontWeight: "500",
  },
}));

const MainContent = () => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <>
      {/* {(() => {
        if (!params?.id && !location.pathname.includes(PATHS.newChat)) {
          return (
            <RenderInfoCenterBox>
              <Typography className={classes.chooseAChatText}>
                {languages[lang].mainScreen.chooseAChat}
              </Typography>
            </RenderInfoCenterBox>
          );
        }
        return <Chat />;
      })()} */}
    </>
  );
};

export default MainContent;
