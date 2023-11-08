import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PATHS } from "@/constants/paths";
import UserAvatar from "@/components/avatar/userAvatar/index";
import {
	SDRoot,
	SDWConversation,
	SDConversation,
	SDInfo,
	SDNoUsersFound,
	SDName,
	SDTextMessage,
	SDTextNoUsersFound,
	SDTextField,
} from "./styles";
import { handleKeyDown } from "@/helpers/index";
import { allActionsStore } from "@/store/rootActions";

const SharedMessage = ({ data }) => {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation("common");

	// SELECTORS
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
		<SDRoot>
			<SDTextField
				id="name"
				variant="outlined"
				size="small"
				placeholder={`${t("generals.shareMessageWith")}...`}
				onChange={handleChatNameHandler}
			/>
			<SDWConversation>
				{conversationsFiltered.length ? (
					conversationsFiltered.map((element) => (
						<SDConversation
							role="button"
							tabIndex="0"
							onClick={() =>
								handleShareMessageId(element.conversationId)
							}
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
							<SDInfo>
								<SDName variant="subtitle1">
									{element.conversationName}
								</SDName>
								<SDTextMessage variant="caption">
									{element.conversationType}
								</SDTextMessage>
							</SDInfo>
						</SDConversation>
					))
				) : (
					<SDNoUsersFound>
						<SDTextNoUsersFound>
							{t("generals.noUsersFound")}.
						</SDTextNoUsersFound>
					</SDNoUsersFound>
				)}
			</SDWConversation>
		</SDRoot>
	);
};

export default SharedMessage;
