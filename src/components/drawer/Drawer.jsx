import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import MainDrawer from "./components/mainDrawer";
import ProfilePage from "@/screens/profile/Profile";
import { allActionsStore } from "@/store/rootActions";

const transitionDuration = 300;

const SwipeableTemporaryDrawer = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const drawerConfig = useSelector(({ appSlice }) => appSlice.drawerConfig);

  // STATES
  const [open, setOpen] = useState(false);

  // FUNCTIONS
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    const setDrawerConfigAction = () => {
      dispatch(
        allActionsStore.setDrawerConfigAction({
          anchor,
          open,
        })
      );
    };

    if (open) {
      return setDrawerConfigAction();
    } else {
      setOpen(false);

      const closeDialogTime = setTimeout(() => {
        setDrawerConfigAction();
        clearTimeout(closeDialogTime);
      }, transitionDuration);
    }
  };

  useEffect(() => {
    if (drawerConfig.open !== open) {
      setOpen(drawerConfig.open);
    }
  }, [drawerConfig.open]);

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
      open={open}
      onClose={toggleDrawer(drawerConfig.anchor, false)}
      onOpen={toggleDrawer(drawerConfig.anchor, true)}
      disableBackdropTransition={true}
    >
      {renderContent(drawerConfig.anchor)}
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
