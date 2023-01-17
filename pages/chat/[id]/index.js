import LayoutMain from "@/core/layouts/LayoutMain";
import Chat from "@/screens/chat/index";

const ChatIdPage = (props) => {
  console.log(props, "props");
  return (
    <LayoutMain>
      <Chat />
    </LayoutMain>
  );
};

export default ChatIdPage;
