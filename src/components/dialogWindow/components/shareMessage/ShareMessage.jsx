import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "@/components/avatar/userAvatar/index";
import { PATHS } from "@/core/constants/paths";
import languages from "@/core/translations";
import { handleKeyDown } from "@/helpers/index";
import { allActionsStore } from "@/store/rootActions";

// rework

// STYLES
const classes = {
	container:
		"m-0 p-[10px] h-min-[50vh] h-max-[50vh] relative overflow-hidden",
	conversation:
		"flex mt-[10px] rounded-[10px] duration-2000 hover:bg-[#b9e6e1] cursor-pointer ",
	name: "font-bold",
	messageText: "max-w-[90%] line-camp-1",
	inputFilter: "w-full",
	wrapperConversation: "h-full flex flex-col overflow-auto mt-[10px]",
	noUsersFound: "flex-center-center",
	noUsersFoundText: "font-semibold text-[24px]",
	info: "ml-[10px]",
};

const SharedMessage = ({ data }) => {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);
	const conversationsList = useSelector(
		({ conversationsSlice }) => conversationsSlice.conversationsList.data,
	);

	// STATES
	const [searchNameChat, setSearchNameChat] = useState("");

	// VARIABLES
	const conversationsFiltered = Object.values(conversationsList).filter(
		(conversation) =>
			conversation.conversationName
				.toLocaleLowerCase()
				.includes(searchNameChat.toLocaleLowerCase()),
	);

	// FUNCTIONS
	const handleChatNameHandler = (event) => {
		setSearchNameChat(event.target.value);
	};

	const handleShareMessageId = (conversationId) => {
		dispatch(allActionsStore.shareMessageAction(data));
		router.push(`${PATHS.chat}/${conversationId}`);
		// history.push({
		//   pathname: `${PATHS.chat}/${conversationId}`,
		//   state: {
		//     from: "shareMessage",
		//   },
		// });
		dispatch(allActionsStore.setDialogWindowClearConfigAction());
	};

	return (
		<div className={classes.container}>
			<TextField
				id="name"
				variant="outlined"
				size="small"
				placeholder={`${languages[lang].generals.shareMessageWith}...`}
				className={classes.inputFilter}
				onChange={handleChatNameHandler}
			/>
			<div className={classes.wrapperConversation}>
				{conversationsFiltered.length ? (
					conversationsFiltered.map((element) => (
						<div
							role="button"
							tabIndex="0"
							onClick={() =>
								handleShareMessageId(element.conversationId)
							}
							className={classes.conversation}
							key={element.conversationId}
							onKeyDown={(event) =>
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								handleKeyDown({ event, fcClick: () => {} })
							}
						>
							<UserAvatar
								source={element.conversationAvatar}
								name={element.conversationName}
								sizeAvatar={38}
							/>
							<div className={classes.info}>
								<Typography
									className={classes.name}
									variant="subtitle1"
								>
									{element.conversationName}
								</Typography>
								<Typography
									variant="caption"
									className={classes.messageText}
								>
									{element.conversationType}
								</Typography>
							</div>
						</div>
					))
				) : (
					<Box className={classes.noUsersFound}>
						<Typography className={classes.noUsersFoundText}>
							{languages[lang].generals.noUsersFound}.
						</Typography>
					</Box>
				)}
			</div>
		</div>
	);
};

export default SharedMessage;
