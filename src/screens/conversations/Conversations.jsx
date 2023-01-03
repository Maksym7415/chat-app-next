"use client";

import { useMemo } from "react";
import shallow from "zustand/shallow";
import { makeStyles } from "@mui/styles";
import ConversationItem from "./components/conversationItem";
import { useConversationsStore } from "@/storeZustand/conversations/store";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 10px 10px",
    height: "100%",
    position: "relative",
  },
}));

const ConversationsPage = () => {
  // HOOKS
  const classes = useStyles();

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

  return (
    <div className={classes.container}>
      {dataSortDate.map((conversation) => {
        return (
          <ConversationItem
            data={conversation}
            usersTyping={usersTyping}
            key={conversation.conversationId}
          />
        );
      })}
    </div>
  );
};

export default ConversationsPage;
