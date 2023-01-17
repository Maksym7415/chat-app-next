"use client";

import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import { useMemo, memo } from "react";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";
import { useAppStore } from "@/storeZustand/app/store";

const ChatBottom = ({ firstName, userId, opponentId, conversationData }) => {
  // HOOKS
  const router = useRouter();

  // STORE
  const { selectedMessages } = useAppStore(
    (state) => ({
      selectedMessages: state.selectedMessages,
    }),
    shallow
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
