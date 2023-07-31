// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from "public/icons/generals/arrowBack.svg";
import MenuIcon from "public/icons/generals/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { SIDE_LEFT_TYPE_CONTENT } from "@/constants/general";
import { allActionsStore } from "@/store/rootActions";
import { SDW, SDIconButton } from "./styles";

const TopLeftComponent = () => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	return (
		<SDW>
			{(() => {
				if (
					[SIDE_LEFT_TYPE_CONTENT.conversations].includes(
						sideLeftConfig.page,
					)
				) {
					return (
						<>
							<SDIconButton
								color="default"
								aria-label="menu"
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
							</SDIconButton>
						</>
					);
				}
				return (
					<SDIconButton
						color="default"
						aria-label="back"
						onClick={() => {
							dispatch(
								allActionsStore.setSideLeftConfigAction({
									page: SIDE_LEFT_TYPE_CONTENT.conversations,
								}),
							);
						}}
					>
						<ArrowBackIcon />
					</SDIconButton>
				);
			})()}
		</SDW>
	);
};

export default TopLeftComponent;
