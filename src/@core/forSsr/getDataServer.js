import { dehydrate, QueryClient } from "react-query";
import { pathBackConversations } from "@/core/constants/urlBack";
import {
  getUserConversationsFetcher,
  getSpaceXData,
} from "@/services/conversations/conversations.fetchers";

export const getDataServer = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [`get_${pathBackConversations.getUserConversations}`, {}],
    async () =>
      await getUserConversationsFetcher({
        options: {},
        cookies: ctx.req?.cookies,
      })
  );

  return queryClient;
};
