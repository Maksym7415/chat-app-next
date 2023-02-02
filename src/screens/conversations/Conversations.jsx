import { useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ConversationItem from "./components/conversationItem";

// STYLES
const classes = {
  container: "overflow-y-auto p-[10px] pt-[0px] h-full relative",
};

const ConversationsPage = () => {
  // HOOKS
  const router = useRouter();

  // SELECTORS
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const usersTyping = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
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
            paramsId={router.query?.id}
          />
        );
      })}
    </div>
  );
};

export default ConversationsPage;
