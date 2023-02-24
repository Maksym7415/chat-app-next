import { memo } from "react";
import { useSelector } from "react-redux";
import { setMessageDate, uuid } from "@/helpers/index";
import Message from "./components/message";

// STYLES
const classes = {
  wrapperSendData: "px-[5px] w-full flex justify-center box-border",
  sendDataText:
    "max-w-[125px] w-full flex justify-center px-[7px] py-[1px] text-[#fffefeb5] rounded-[10px] overflow-hidden bg-[rgba(0, 0, 0, 0.4)]",
};

const RowItemMessage = ({
  index,
  messageData,
  conversationId,
  typeConversation,
}) => {
  // SELECTORS
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  if (!messageData) {
    return <></>;
  }
  let isShowAvatar = false;
  if (messageData?.fkSenderId !== authToken.userId) {
    isShowAvatar = true;
  }
  if (messageData?.component) {
    return (
      <div className={classes.wrapperSendData} key={uuid()}>
        <p className={classes.sendDataText}>
          {setMessageDate(new Date(messageData.sendDate))}
        </p>
      </div>
    );
  }

  return (
    <Message
      key={uuid()}
      conversationId={conversationId}
      isShowAvatar={isShowAvatar}
      messageData={messageData}
      userId={authToken.userId}
      typeConversation={typeConversation}
      index={index}
    />
  );
};

export default memo(RowItemMessage);
