import {
  initialState,
  setSelectedMessagesAction,
} from "../reduxToolkit/app/slice";
import { store } from "../reduxToolkit/store";

export const actionsClearSelectedMessages = (force) => {
  const selectedMessages = store.getState().appSlice.selectedMessages;

  if (!Object.keys(selectedMessages.messages).length && !force) return;

  return store.dispatch(
    setSelectedMessagesAction(initialState.selectedMessages)
  );
};
