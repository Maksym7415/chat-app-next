import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params }) => {
  return (
    <LayoutMain>
      <Chat params={params} />
    </LayoutMain>
  );
};

export const getServerSideProps =  async (ctx) => {
    const redirectToken = await checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    return {
      props: {
        params: ctx.params,
      },
    };
  }


export default NewChatPage;
