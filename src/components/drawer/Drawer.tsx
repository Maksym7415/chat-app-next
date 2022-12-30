import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MainDrawer from "./components/mainDrawer";
import ProfilePage from "../../pages/profile";
import { setDrawerConfigAction } from "./redux/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

type Anchor = "top" | "left" | "bottom" | "right";

const SwipeableTemporaryDrawer = () => {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const drawerConfig: any = useAppSelector(
    ({ drawerSlice }) => drawerSlice.drawerConfig
  );

  // FUNCTIONS
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      dispatch(
        setDrawerConfigAction({
          anchor,
          open,
        })
      );
    };

  const renderContent = (anchor: Anchor) => (
    <Box sx={{ width: drawerConfig?.width || 300 }}>
      {(() => {
        switch (drawerConfig?.type) {
          case "profile":
            return (
              <ProfilePage
                typeProfile={drawerConfig.configContent?.typeProfile}
                conversationData={drawerConfig.configContent?.conversationData}
                closeDrawer={toggleDrawer(anchor, false)}
              />
            );
          case "main":
            return <MainDrawer closeDrawer={toggleDrawer(anchor, false)} />;
          default:
            return <></>;
        }
      })()}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={drawerConfig.anchor}
      open={drawerConfig.open}
      onClose={toggleDrawer(drawerConfig.anchor, false)}
      onOpen={toggleDrawer(drawerConfig.anchor, true)}
    >
      {renderContent(drawerConfig.anchor)}
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
