export const getMessagesWithSendDate = (messages) => {
  try {
    let currentDay = 0;
    let messagesWithSendDate = [];

    messages?.map((el) => {
      if (new Date(el.sendDate).getDate() !== currentDay) {
        currentDay = new Date(el.sendDate).getDate();
        messagesWithSendDate = [
          ...messagesWithSendDate,
          { component: "div", sendDate: el.sendDate },
          el,
        ];
      } else {
        currentDay = new Date(el.sendDate).getDate();
        messagesWithSendDate = [...messagesWithSendDate, el];
      }
      return el;
    });

    return {
      messagesWithSendDate,
      messages,
    };
  } catch (error) {
    console.error(error, "in getMessagesWithSendDate");
    return {
      messagesWithSendDate: [],
      messages,
    };
  }
};
