import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import BottomToolbar from "./components/bottomToolbar";
import MessageInput from "./components/messageInput/MessageInput";

const ChatBottom = ({ opponentId }) => {
	// HOOKS
	const router = useRouter();

	// SELECTORS
	const selectedMessages = useSelector(
		({ appSlice }) => appSlice.selectedMessages,
	);

	// VARIABLES
	const conversationId = useMemo(() => router.query?.id, [router.query?.id]);

	const renderBottom = () => {
		if (selectedMessages.active) {
			return (
				<BottomToolbar
					conversationId={conversationId}
					selectedMessages={selectedMessages}
				/>
			);
		}
		return (
			<MessageInput
				conversationId={conversationId}
				opponentId={opponentId}
			/>
		);
	};

	return <>{renderBottom()}</>;
};

export default memo(ChatBottom);
