import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { allActionsStore } from "@/store/rootActions";

// STYLES
const classes = {
	container: "mr-[15px] ",
};

const TopLeftComponent = () => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	return (
		<div className={classes.container}>
			{(() => {
				if (
					[SIDE_LEFT_TYPE_CONTENT.conversations].includes(
						sideLeftConfig.page,
					)
				) {
					return (
						<>
							<IconButton
								color="default"
								aria-label="menu"
								edge="end"
								onClick={() => {
									dispatch(
										allActionsStore.setDrawerConfigAction({
											anchor: "left",
											open: true,
											type: "main",
										}),
									);
								}}
							>
								<MenuIcon />
							</IconButton>
						</>
					);
				}
				return (
					<IconButton
						color="default"
						aria-label="back"
						edge="end"
						onClick={() => {
							dispatch(
								allActionsStore.setSideLeftConfigAction({
									page: SIDE_LEFT_TYPE_CONTENT.conversations,
								}),
							);
						}}
					>
						<ArrowBackIcon />
					</IconButton>
				);
			})()}
		</div>
	);
};

export default TopLeftComponent;
