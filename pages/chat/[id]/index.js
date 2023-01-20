import { dehydrate, QueryClient } from "react-query";
import CircularJSON from "circular-json";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getDataServer } from "@/core/forSsr/getDataServer";
import Chat from "@/screens/chat/index";
import { pathBackConversations } from "@/core/constants/urlBack";
import { getFetcher } from "@/services/fetchers";
import {
  getUserConversationsFetcher,
  getSpaceXData,
} from "@/services/conversations/conversations.fetchers";

const ChatIdPage = (props) => {
  return (
    <LayoutMain params={props.params}>
      <Chat />
    </LayoutMain>
  );
};

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  // let queryClient = await getDataServer(ctx);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [`get_${pathBackConversations.getUserConversations}`, {}],
    async () =>
      await getUserConversationsFetcher({
        options: {},
        cookies: ctx.req?.cookies,
      })
  );

  // await queryClient.prefetchQuery(
  //   [
  //     `get_${pathBackConversations.conversationHistory}`,
  //     {
  //       offset: 0,
  //     },
  //   ],
  //   async () =>
  //     await getFetcher({
  //       url: pathBackConversations.conversationHistory,
  //       options: {
  //         additionalUrl: `${ctx.params?.id}` || "",
  //         params: { offset: 0 },
  //       },
  //       cookies: ctx.req?.cookies,
  //     })
  // );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      params: ctx.params,
    },
  };
};

export default ChatIdPage;
