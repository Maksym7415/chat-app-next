import LayoutMain from "@/core/layouts/LayoutMain";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params, ...rest }) => {
  return (
    <LayoutMain>
      <Chat params={params} />
    </LayoutMain>
  );
};

export default NewChatPage;
