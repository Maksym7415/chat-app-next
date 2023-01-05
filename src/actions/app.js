import { useAppStore, initialState } from "@/storeZustand/app/store";

export const actionsClearSelectedMessages = (force) => {
  const selectedMessages = useAppStore.getState().selectedMessages;
  if (!Object.keys(selectedMessages.messages).length && !force) return;
  return useAppStore
    .getState()
    .setSelectedMessagesAction(initialState.selectedMessages);
};
