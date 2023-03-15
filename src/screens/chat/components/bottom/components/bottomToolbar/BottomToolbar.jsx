import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Fade,
	IconButton,
	Paper,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import * as config from "./config";
import { allActionsStore } from "@/store/rootActions";

// STYLES
const classes = {
	root: "flex px-[0px] py-[10px] justify-center",
	wrapper: "w-[80%] max-w-[500px]",
};

const BottomToolbar = ({ conversationId, selectedMessages }) => {
	// HOOKS
	const dispatch = useDispatch();

	// VARIABLES
	const selectedMessagesAmount = Object.keys(
		selectedMessages.messages,
	).length;

	// FUNCTIONS
	const handleClickAction = async (typeAction) => {
		await dispatch(
			allActionsStore.messagesChatAction({
				conversationId,
				typeAction,
			}),
		);

		dispatch(allActionsStore.resetSelectedMessagesAction());
	};

	return (
		<Box className={classes.root}>
			<Paper
				className={classes.wrapper}
				elevation={12}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => {
							dispatch(
								allActionsStore.resetSelectedMessagesAction(),
							);
						}}
					>
						<CloseIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						{selectedMessagesAmount} message selected
					</Typography>
					{!!selectedMessagesAmount &&
						config.actionsMessagesToolbar("lang").map((item) => {
							return (
								<IconButton
									size="large"
									color="inherit"
									key={item.id}
									onClick={() =>
										handleClickAction(item.value)
									}
								>
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 600 }}
										title={item.title}
									>
										{item.iconComponent}
									</Tooltip>
								</IconButton>
							);
						})}
				</Toolbar>
			</Paper>
		</Box>
	);
};

export default BottomToolbar;
