import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getDataServer } from "@/core/forSsr/getDataServer";

const ChatPage = () => {
  return <LayoutMain titlePage={"Chat"} />;
};

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  const queryClient = await getDataServer(ctx);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default ChatPage;
