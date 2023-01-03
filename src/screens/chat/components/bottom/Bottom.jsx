"use client";

import { useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";

const ChatBottom = ({ firstName, userId, opponentId, conversationData }) => {
  // HOOKS
  // const params = useParams();

  const params = {};
  // SELECTORS
  const selectedMessages = useSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );

  // VARIABLES
  const conversationId = useMemo(() => params?.id || 0, [params]);

  const renderBottom = () => {
    if (selectedMessages.active) {
      return <BottomToolbar conversationId={conversationId} />;
    } else {
      return (
        <MessageInput
          conversationId={conversationId}
          userId={userId}
          firstName={firstName}
          opponentId={opponentId}
        />
      );
    }
  };

  return <>{renderBottom()}</>;
};

export default memo(ChatBottom);
