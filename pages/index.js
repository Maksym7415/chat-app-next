import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import { wrapper } from "@/store/store";

const HomePage = () => {
  return <LayoutMain />;
};

HomePage.isPrivatePage = true;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const redirectToken = checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    const { queryClient } = await getInitialData(ctx, store);

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  }
);

export default HomePage;
