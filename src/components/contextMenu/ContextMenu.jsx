import { Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useSelector } from "react-redux";
import { SDItem, SDWrapperIcon } from "./styles";
import SvgMaker from "@/components/svgMaker/index";
import { CONTEXT_MENU_ID } from "@/constants/general";

const ContextMenu = () => {
	// SELECTORS
	const contextMenuConfig = useSelector(
		({ appSlice }) => appSlice.contextMenuConfig,
	);

	return (
		<Menu id={CONTEXT_MENU_ID.main}>
			{contextMenuConfig?.config?.map((item) => (
				<SDItem
					key={item.id}
					onClick={() => contextMenuConfig.callBackItem(item)}
					closeOnClick={!item?.NoCloseOnClick}
				>
					{item?.iconComponent || item?.icon?.name ? (
						<SDWrapperIcon>
							{item?.iconComponent}
							{item?.icon?.name && (
								<SvgMaker name={item?.icon?.name} />
							)}
						</SDWrapperIcon>
					) : null}
					{item.title}
				</SDItem>
			))}
		</Menu>
	);
};

export default ContextMenu;
