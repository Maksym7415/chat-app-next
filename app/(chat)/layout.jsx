"use client";

import { useEffect } from "react";
import shallow from "zustand/shallow";
import LayoutMain from "@/core/layouts/LayoutMain";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { getTokenCook } from "@/core/cookiesStorage/index";

export default function ChatLayout({ children }) {
  const token = getTokenCook();

  const { authTokenAction } = useAuthStore(
    (state) => ({
      authTokenAction: state.authTokenAction,
    }),
    shallow
  );
  const { getUserConversationsRequest } = useConversationsStore(
    (state) => ({
      getUserConversationsRequest: state.getUserConversationsRequest,
    }),
    shallow
  );

  useEffect(() => {
    getUserConversationsRequest();
    authTokenAction(token);
  }, []);

  return <>{children}</>;
}
