import { useQuery } from "react-query";

import { getUserConversationsFetcher } from "./conversations.fetchers";
import { pathBackConversations } from "@/core/constants/urlBack";
import { useConversationsStore } from "@/storeZustand/conversations/store";

export const GetUserConversationsQuery = (options) => {
  console.log("start");
  const queryData = useQuery({
    queryKey: [`get_${pathBackConversations.getUserConversations}`, options],
    queryFn: async () => await getUserConversationsFetcher({ options }),
    retry: 1,
    staleTime: Infinity,
    onSuccess() {
      console.log("onSuccess");
    },
    onError(error) {
      console.log(error, "onError");
      console.dir(error, "onError dir");
    },
  });

  if (
    queryData.data &&
    JSON.stringify(useConversationsStore.getState().conversationsList?.data) ===
      "{}"
  ) {
    console.log("change");
    useConversationsStore.getState().setConversationListAction(queryData.data);
  }

  console.log("end");
  return queryData;
};
