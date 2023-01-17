import { useRouter } from "next/router";
import LayoutMain from "@/core/layouts/LayoutMain";
import {
  getUserConversationsFetcher,
  getSpaceXData,
} from "@/services/conversations/conversations.fetchers";
import usePAth from "@/core/constants/paths";
import { pathBackConversations } from "@/core/constants/urlBack";
import { dehydrate, QueryClient } from "react-query";

const HomePage = ({}) => {
  return <LayoutMain />;
};

HomePage.isPrivatePage = true;

export const getServerSideProps = async (ctx) => {
  const accessToken = ctx.req?.cookies?.["accessToken"];

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
    };
  }

  // react qr
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [`get_${pathBackConversations.getUserConversations}`, {}],
    async () =>
      await getUserConversationsFetcher({
        options: {},
        cookies: ctx.req?.cookies,
      })
  );
  //

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default HomePage;
