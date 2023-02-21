import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";

const ChatPage = () => {
  return <LayoutMain titlePage={"Chat"} />;
};

export const getServerSideProps =  async (ctx) => {
    const redirectToken = checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    return {
      props: {},
    };
  }


export default ChatPage;
