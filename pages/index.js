import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";

const HomePage = () => {
  return <LayoutMain />;
};

HomePage.isPrivatePage = true;

export const getServerSideProps = async (ctx) => {
  const redirectToken = checkIsToken(ctx);

  if (redirectToken) {
    return redirectToken;
  }

  await getInitialData(ctx, store);

  return {
    props: {},
  };
};

export default HomePage;
