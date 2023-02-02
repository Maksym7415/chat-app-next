import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useMemo, memo } from "react";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";

const ChatBottom = ({ opponentId }) => {
  // HOOKS
  const router = useRouter();

  // SELECTORS
  const selectedMessages = useSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );

  // VARIABLES
  const conversationId = useMemo(() => {
    return router.query?.id;
  }, [router.query?.id]);

  const renderBottom = () => {
    if (selectedMessages.active) {
      return (
        <BottomToolbar
          conversationId={conversationId}
          selectedMessages={selectedMessages}
        />
      );
    } else {
      return (
        <MessageInput conversationId={conversationId} opponentId={opponentId} />
      );
    }
  };

  return <>{renderBottom()}</>;
};

export default memo(ChatBottom);
