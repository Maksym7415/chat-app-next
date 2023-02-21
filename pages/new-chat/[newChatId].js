import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params }) => {
  return (
    <LayoutMain>
      <Chat params={params} />
    </LayoutMain>
  );
};

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  const {} = await getInitialData(ctx, store);

  return {
    props: {
      params: ctx.params,
    },
  };
};

export default NewChatPage;
