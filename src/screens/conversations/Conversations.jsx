import { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import ConversationItem from "./components/conversationItem";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { useSearchStore } from "@/storeZustand/search/store";

// STYLES
const classes = {
  container: "overflow-y-auto p-[10px] pt-[0px] h-full relative",
};

const ConversationsPage = () => {
  // HOOKS
  const router = useRouter();

  // STORE
  const searchContacts = useSearchStore((state) => state.searchContacts);

  const { conversationsList, usersTyping } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
      usersTyping: state.conversationTypeState,
    }),
    shallow
  );

  useEffect(() => {
    console.log("??----ConversationsPage -USEEFFECTS");
  }, [searchContacts]);

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
            paramsId={router.query?.id}
          />
        );
      })}
    </div>
  );
};

export default ConversationsPage;
