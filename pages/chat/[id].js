import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import Chat from "@/screens/chat/index";
import { getConversationMessagesQuery } from "@/services/conversations/service";

const ChatIdPage = (props) => {
  return (
    <LayoutMain params={props.params}>
      <Chat params={props.params} />
    </LayoutMain>
  );
};

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  const { queryClient } = await getInitialData(ctx);

  console.time(ctx.params?.id, "Time this"); // при старті може бути 70ms  при переході на інший чат до 47ms без запиту 0.004 ms, більше

  const additionalUrl = ctx.params?.id ? `${ctx.params?.id}` : null;
  const params = { offset: 0 };

  await getConversationMessagesQuery({
    params,
    cookies: ctx.req?.cookies,
    additionalUrl,
  });

  console.timeEnd(ctx.params?.id, "Time this END");

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      params: ctx.params,
    },
  };
};

export default ChatIdPage;
