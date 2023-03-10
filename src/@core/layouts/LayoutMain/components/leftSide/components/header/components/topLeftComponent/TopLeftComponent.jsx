import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { setDrawerConfigAction } from "@/components/drawer/redux/slice";
import { setSideLeftConfigAction } from "@/store/app/slice";

// STYLES
const classes = {
  container: "mr-[15px] ",
};

const TopLeftComponent = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const sideLeftConfig = useSelector(({ appSlice }) => appSlice.sideLeftConfig);

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
                  dispatch(
                    setDrawerConfigAction({
                      anchor: "left",
                      open: true,
                      type: "main",
                    })
                  );
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
                dispatch(
                  setSideLeftConfigAction({
                    page: SIDE_LEFT_TYPE_CONTENT.conversations,
                  })
                );
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
