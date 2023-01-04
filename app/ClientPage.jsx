"use client";

import { useEffect } from "react";
import shallow from "zustand/shallow";
import LayoutMain from "@/core/layouts/LayoutMain";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { ConversationsService } from "@/services/conversations/conversations.service";

const MainClientPage = ({ token }) => {
  const { authTokenAction } = useAuthStore(
    (state) => ({
      authTokenAction: state.authTokenAction,
    }),
    shallow
  );
  // const { getUserConversationsRequest } = useConversationsStore(
  //   (state) => ({
  //     getUserConversationsRequest: state.getUserConversationsRequest,
  //   }),
  //   shallow
  // );
  ConversationsService.useGetUserConversations();
  useEffect(() => {
    // getUserConversationsRequest();
    // ConversationsService.useGetUserConversations();
    authTokenAction(token);
  }, []);

  return (
    <>
      <LayoutMain />
    </>
  );
};

export default MainClientPage;
