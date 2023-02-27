import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import MainDrawer from "./components/mainDrawer";
import ProfilePage from "@/screens/profile/Profile";
import { allActionsStore } from "@/store/rootActions";

const SwipeableTemporaryDrawer = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const drawerConfig = useSelector(
    ({ appSlice }) => appSlice.drawerConfig
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

    dispatch(
      allActionsStore.setDrawerConfigAction({
        anchor,
        open,
      })
    );
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
