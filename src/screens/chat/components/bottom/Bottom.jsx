"use client";

import { usePathname } from "next/navigation";
import shallow from "zustand/shallow";
import { useMemo, memo } from "react";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";
import { useAppStore } from "@/storeZustand/app/store";

const ChatBottom = ({ firstName, userId, opponentId, conversationData }) => {
  // HOOKS
  const pathname = usePathname();

  const { selectedMessages } = useAppStore(
    (state) => ({
      selectedMessages: state.selectedMessages,
    }),
    shallow
  );

  // VARIABLES
  const conversationId = useMemo(() => {
    const pathnameSplit = pathname.split("/");
    return +pathnameSplit[pathnameSplit.length - 1];
  }, [pathname]);

  const renderBottom = () => {
    if (selectedMessages.active) {
      return <BottomToolbar conversationId={conversationId} selectedMessages={selectedMessages}/>;
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
