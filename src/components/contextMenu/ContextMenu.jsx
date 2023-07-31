import { makeStyles } from "@mui/styles";
import { Item, Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useSelector } from "react-redux";
import SvgMaker from "@/components/svgMaker/index";
import { CONTEXT_MENU_ID } from "@/constants/general";

// makeStyles
const useStyles = makeStyles(() => ({
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

// need style

// STYLES
// const classes = {
// 	wrapperIcon: "mr-[10px]",
// 	item: "hover:",
// };

const ContextMenu = () => {
	// HOOKS
	const classes = useStyles();

	const contextMenuConfig = useSelector(
		({ appSlice }) => appSlice.contextMenuConfig,
	);

	return (
		<Menu id={CONTEXT_MENU_ID.main}>
			{contextMenuConfig?.config?.map((item) => (
				<Item
					key={item.id}
					onClick={() => contextMenuConfig.callBackItem(item)}
					closeOnClick={!item?.NoCloseOnClick}
					className={classes.item}
				>
					{item?.iconComponent || item?.icon?.name ? (
						<div className={classes.wrapperIcon}>
							{item?.iconComponent}
							{item?.icon?.name && (
								<SvgMaker name={item?.icon?.name} />
							)}
						</div>
					) : null}
					{item.title}
				</Item>
			))}
		</Menu>
	);
};

export default ContextMenu;
