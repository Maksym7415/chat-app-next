import { dehydrate } from "react-query";
import LayoutMain from "@/core/layouts/LayoutMain";
import { checkIsToken } from "@/core/forSsr/checkIsToken";
import { getInitialData } from "@/core/forSsr/getData";
import Chat from "@/screens/chat/index";
import { wrapper } from "@/store/store";

const NewChatPage = ({ params }) => {
  return (
    <LayoutMain>
      <Chat params={params} />
    </LayoutMain>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const redirectToken = checkIsToken(ctx);

    if (redirectToken) {
      return redirectToken;
    }

    // const newChatId = store.getState().appSlice.openChatData.newChatId;

    // console.log(store.getState().appSlice, "newChatId");
    // if (!newChatId) {
    //   return {
    //     redirect: {
    //       dehydratedState: null,
    //       permanent: false,
    //       destination: "/",
    //     },
    //   };
    // }

    const { queryClient } = await getInitialData(ctx, store);

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  }
);

export default NewChatPage;
