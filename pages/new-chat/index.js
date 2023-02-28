import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";

const NewChatPage = () => {
  return <LayoutMain />;
};

export const getServerSideProps = async (ctx) => {
    const redirectToken = await checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    return {
      props: {},
    };
  }


export default NewChatPage;
