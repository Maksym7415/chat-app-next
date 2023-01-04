"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import shallow from "zustand/shallow";
import ConversationItem from "./components/conversationItem";
import { useConversationsStore } from "@/storeZustand/conversations/store";

// STYLES
const classes = {
  container: "overflow-y-auto p-[10px] pt-[0px] h-full relative",
};

const ConversationsPage = () => {
  // HOOKS
  const pathname = usePathname();

  const { conversationsList, usersTyping } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
      usersTyping: state.conversationTypeState,
    }),
    shallow
  );

  // VARIABLES
  const dataSortDate = useMemo(
    () =>
      [...Object.values(conversationsList)]?.sort(
        (a, b) =>
          new Date(b?.Messages?.[0]?.sendDate).getTime() -
          new Date(a?.Messages?.[0]?.sendDate).getTime()
      ) || [],
    [conversationsList]
  );
  const pathnameSplit = pathname.split("/");

  return (
    <div className={classes.container}>
      {dataSortDate.map((conversation) => {
        return (
          <ConversationItem
            data={conversation}
            usersTyping={usersTyping}
            key={conversation.conversationId}
            paramsId={pathnameSplit[pathnameSplit.length - 1]}
          />
        );
      })}
    </div>
  );
};

export default ConversationsPage;
