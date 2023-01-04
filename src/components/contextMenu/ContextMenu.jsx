import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import shallow from "zustand/shallow";
import { makeStyles } from "@mui/styles";
import SvgMaker from "../svgMaker";
import { CONTEXT_MENU_ID } from "@/core/constants/general";
import { useAppStore } from "@/storeZustand/app/store";

// makeStyles
const useStyles = makeStyles((theme) => ({
  wrapperIcon: {
    marginRight: 10,
  },
  item: {
    "&:hover": {
      "& svg": {
        "& path": {
          stroke: "#ffffff",
        },
      },
    },
  },
}));

const ContextMenu = () => {
  // HOOKS
  const classes = useStyles();

  const { contextMenuConfig } = useAppStore(
    (state) => ({
      contextMenuConfig: state.contextMenuConfig,
    }),
    shallow
  );

  return (
    <Menu id={CONTEXT_MENU_ID.main}>
      {contextMenuConfig?.config?.map((item) => (
        <Item
          key={item.id}
          onClick={() => contextMenuConfig.callBackItem(item)}
          closeOnClick={item?.NoCloseOnClick ? false : true}
          className={classes.item}
        >
          {item?.iconComponent || item?.icon?.name ? (
            <div className={classes.wrapperIcon}>
              {item?.iconComponent}
              {item?.icon?.name && <SvgMaker name={item?.icon?.name} />}
            </div>
          ) : null}
          {item.title}
        </Item>
      ))}
    </Menu>
  );
};

export default ContextMenu;
