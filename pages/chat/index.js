import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";

const ChatPage = () => {
  return <LayoutMain titlePage={"Chat"} />;
};

export const getServerSideProps = async (ctx) => {
    const redirectToken = checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    const {} = await getInitialData(ctx, store);

    return {
      props: {},
    };
  }


export default ChatPage;
