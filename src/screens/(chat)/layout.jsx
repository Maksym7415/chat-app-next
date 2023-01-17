"use client";

import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { ConversationsService } from "@/services/conversations/conversations.service";

export default function ChatLayout({ children }) {
  const token = getTokenCook();

  const { authTokenAction } = useAuthStore(
    (state) => ({
      authTokenAction: state.authTokenAction,
    }),
    shallow
  );
  ConversationsService.useGetUserConversations();

  useEffect(() => {
    authTokenAction(token);
  }, []);

  return <>{children}</>;
}
