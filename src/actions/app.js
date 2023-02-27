import { initialState } from "@/store/app/slice";
import { allActionsStore } from "@/store/rootActions";
import { store } from "@/store/store";

export const actionsClearSelectedMessages = (force) => {
  const selectedMessages = store.getState().appSlice.selectedMessages;

  if (!Object.keys(selectedMessages.messages).length && !force) return;
  return store.dispatch(
    allActionsStore.setSelectedMessagesAction(initialState.selectedMessages)
  );
};
