"use client";

import { makeStyles } from "@mui/styles";
import shallow from "zustand/shallow";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

import { SIDE_LEFT_TYPE_CONTENT } from "@/config/constants/general";
import { useAppStore } from "@/storeZustand/app/store";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: "15px",
  },
}));

const TopLeftComponent = () => {
  // HOOKS
  const classes = useStyles();

  const { sideLeftConfig, setSideLeftConfigAction, setDrawerConfigAction } =
    useAppStore(
      (state) => ({
        sideLeftConfig: state.sideLeftConfig,
        setSideLeftConfigAction: state.setSideLeftConfigAction,
        setDrawerConfigAction: state.setDrawerConfigAction,
      }),
      shallow
    );

  return (
    <div className={classes.container}>
      {(() => {
        if (
          [SIDE_LEFT_TYPE_CONTENT.conversations].includes(sideLeftConfig.page)
        ) {
          return (
            <>
              <IconButton
                color="default"
                aria-label="menu"
                edge="end"
                onClick={() => {
                  setDrawerConfigAction({
                    anchor: "left",
                    open: true,
                    type: "main",
                  });
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          );
        } else {
          return (
            <IconButton
              color="default"
              aria-label="back"
              edge="end"
              onClick={() => {
                setSideLeftConfigAction({
                  page: SIDE_LEFT_TYPE_CONTENT.conversations,
                });
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          );
        }
      })()}
    </div>
  );
};

export default TopLeftComponent;