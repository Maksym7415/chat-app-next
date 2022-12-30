import React from "react";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { makeStyles } from "@mui/styles";
import SvgMaker from "../../components/svgMaker";
import { useAppSelector } from "../../hooks/redux";
import { eContextMenuId } from "../../ts/enums/app";

// need ts

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

  // SELECTORS
  const contextMenuConfig: any = useAppSelector(
    ({ contextMenuSlice }) => contextMenuSlice.contextMenuConfig
  );

  return (
    <Menu id={eContextMenuId.main}>
      {contextMenuConfig?.config?.map((item: any) => (
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
