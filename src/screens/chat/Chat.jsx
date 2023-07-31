import { Box, Typography } from "@mui/material";
import { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatBottom from "./components/bottom";
import ChatHeader from "./components/header";
import ChatContent from "./components/mainContent";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import { LAST_ACTION_MESSAGES_STORE } from "@/constants/general";
import { getMessagesWithSendDate } from "@/helpers/index";
import { conversationsApi } from "@/store/conversations/api";
import { allActionsStore } from "@/store/rootActions";

// fix locale

// STYLES
const classes = {
	container: "flex flex-col h-screen w-full relative ",
	errorBackText: "text-[28px] font-medium ",
	wrapperMessages: "flex flex-1 flex-col w-full h-full",
};

const scrollPositionChats = {};

const Chat = ({ params }) => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const conversationsList = useSelector(
		({ conversationsSlice }) => conversationsSlice.conversationsList.data,
	);
	const newChatData = useSelector(({ appSlice }) => appSlice.newChatData);

	// VARIABLES
	const conversationId = useMemo(() => params?.id || null, [params]);

	const opponentId = newChatData?.newChatId || null;
	const conversationData = useMemo(
		() =>
			conversationsList?.[conversationId] ||
			newChatData?.conversationData ||
			{},
		[conversationsList, conversationId, newChatData, params],
	);

	const typeConversation = useMemo(
		() => conversationData?.conversationType?.toLowerCase() || "",
		[conversationData],
	);

	const messagesChat =
		useSelector(
			({ conversationsSlice }) =>
				conversationsSlice.historyConversationsId?.[conversationId]
					?.messages,
		) || [];

	const [getConversationMessagesRequest, { isError }] =
		conversationsApi.useLazyGetConversationMessagesQuery();

	// USEEFFECTS
	useLayoutEffect(() => {
		if (!messagesChat.length && conversationId) {
			getConversationMessagesRequest({
				params: {
					offset: 0,
				},
				additionalUrl: conversationId ? `${conversationId}` : "",
				conversationId,
				cb: (response) => {
					const messagesResult =
						getMessagesWithSendDate(response?.data)?.messages || [];

					dispatch(
						allActionsStore.setMessagesDataInConversationsIdAction({
							conversationId,
							messages: messagesResult,
							pagination: response.pagination,
							lastAction: LAST_ACTION_MESSAGES_STORE.set,
						}),
					);
				},
			});
		}
	}, [conversationId]);

	if (isError) {
		return (
			<RenderInfoCenterBox>
				<Typography className={classes.errorBackText}>
					ErrorBack
				</Typography>
			</RenderInfoCenterBox>
		);
	}

	if (!conversationId && !opponentId && !params?.newChatId) {
		return <></>;
	}

	return (
		<>
			<Box className={classes.container}>
				<ChatHeader
					conversationData={conversationData}
					conversationId={conversationId}
					typeConversation={typeConversation}
					messages={messagesChat}
				/>
				<div className={classes.wrapperMessages}>
					{messagesChat.length ? (
						<ChatContent
							typeConversation={typeConversation}
							conversationId={conversationId}
							messagesChat={messagesChat || []}
							scrollPositionChats={scrollPositionChats}
						/>
					) : null}
				</div>

				<ChatBottom
					opponentId={opponentId}
					conversationData={conversationData}
				/>
			</Box>
		</>
	);
};

export default Chat;
