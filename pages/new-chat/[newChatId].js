import LayoutMain from "@/core/layouts/LayoutMain";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params }) => (
    <LayoutMain>
      <Chat params={params} />
    </LayoutMain>
  );

export const getServerSideProps = async (ctx) => ({
    props: {
      params: ctx.params,
    },
  });

export default NewChatPage;
