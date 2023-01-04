"use client";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MainDrawer from "./components/mainDrawer";
import ProfilePage from "@/screens/profile/Profile";
import { useAppStore } from "@/storeZustand/app/store";
import shallow from "zustand/shallow";

const SwipeableTemporaryDrawer = () => {
  const { drawerConfig, setDrawerConfigAction } = useAppStore(
    (state) => ({
      drawerConfig: state.drawerConfig,
      setDrawerConfigAction: state.setDrawerConfigAction,
    }),
    shallow
  );

  // FUNCTIONS
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerConfigAction({
      anchor,
      open,
    });
  };

  const renderContent = (anchor) => (
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
