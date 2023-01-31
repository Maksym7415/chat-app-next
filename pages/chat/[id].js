import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import Chat from "@/screens/chat/index";
import { wrapper } from "@/store/store";
import { pathBackConversations } from "@/core/constants/urlBack";
import { getFetcher } from "@/services/fetchers";
import { setOpenChatDataAction } from "@/store/app/slice";

const ChatIdPage = (props) => {
  return (
    <LayoutMain params={props.params}>
      <Chat params={props.params} />
    </LayoutMain>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     const redirectToken = checkIsToken(ctx);

//     if (redirectToken) {
//       return redirectToken;
//     }

//     const { queryClient } = await getInitialData(ctx, store);

//     console.time(ctx.params?.id, "Time this"); // при старті може бути 70ms  при переході на інший чат до 47ms без запиту 0.004 ms, більше

//     const additionalUrl = ctx.params?.id ? `${ctx.params?.id}` : null;

//     console.log(additionalUrl, "additionalUrl");
//     await queryClient.prefetchQuery(
//       [
//         `get_${pathBackConversations.conversationHistory}`,
//         {
//           offset: 0,
//         },
//         additionalUrl,
//       ],
//       async () => {
//         const response = await getFetcher({
//           url: pathBackConversations.conversationHistory,
//           options: {
//             params: { offset: 0 },
//           },
//           additionalUrl,
//           cookies: ctx.req?.cookies,
//         });
//         return response.data;
//       }
//     );

//     console.timeEnd(ctx.params?.id, "Time this END");

//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//         params: ctx.params,
//       },
//     };
//   }
// );

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  const { queryClient } = await getInitialData(ctx);

  console.time(ctx.params?.id, "Time this"); // при старті може бути 70ms  при переході на інший чат до 47ms без запиту 0.004 ms, більше

  const additionalUrl = ctx.params?.id ? `${ctx.params?.id}` : null;

  console.log(additionalUrl, "additionalUrl");
  await queryClient.prefetchQuery(
    [
      `get_${pathBackConversations.conversationHistory}`,
      {
        offset: 0,
      },
      additionalUrl,
    ],
    async () => {
      const response = await getFetcher({
        url: pathBackConversations.conversationHistory,
        options: {
          params: { offset: 0 },
        },
        additionalUrl,
        cookies: ctx.req?.cookies,
      });
      return response.data;
    }
  );

  console.timeEnd(ctx.params?.id, "Time this END");

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      params: ctx.params,
    },
  };
};

export default ChatIdPage;
