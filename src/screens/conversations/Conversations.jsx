"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import ConversationItem from "./components/conversationItem";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { ConversationsService } from "@/services/conversations/conversations.service";
import { useQuery } from "react-query";
import {
  getUserConversationsFetcher,
  getSpaceXData,
} from "@/services/conversations/conversations.fetchers";
import { GetUserConversationsQuery } from "@/services/conversations/service";
import { queryClient } from "@/pages/_app";
import { pathBackConversations } from "@/core/constants/urlBack";

// STYLES
const classes = {
  container: "overflow-y-auto p-[10px] pt-[0px] h-full relative",
};

const ConversationsPage = () => {
  // HOOKS
  const router = useRouter();

  const [options, setOptions] = useState({});
  // ConversationsService.useGetUserConversations();
  // const { data } = useQuery("spacex", getUserConversationsFetcher, {
  //   staleTime: Infinity,
  // });

  const queryConversations = GetUserConversationsQuery(options);

  console.log(queryConversations?.data, "spacex");
  console.log(queryConversations?.isLoading, "isLoading");
  console.log(queryConversations?.isFetching, "isFetching");

  // STORE
  const { conversationsList, usersTyping } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
      usersTyping: state.conversationTypeState,
    }),
    shallow
  );

  // console.log(conversationsList, "conversationsList");
  // VARIABLES
  const dataSortDate = useMemo(
    () =>
      [...Object.values(conversationsList)]?.sort(
        (a, b) =>
          new Date(b?.Messages?.[0]?.sendDate).getTime() -
          new Date(a?.Messages?.[0]?.sendDate).getTime()
      ) || [],
    [conversationsList]
  );

  return (
    <div className={classes.container}>
      {dataSortDate.map((conversation) => {
        return (
          <ConversationItem
            data={conversation}
            usersTyping={usersTyping}
            key={conversation.conversationId}
            paramsId={router.query?.id}
          />
        );
      })}
      <button
        onClick={() => {
          // queryClient.prefetchQuery(
          //   [`get_${pathBackConversations.getUserConversations}`],
          //   async () =>
          //     await getUserConversationsFetcher({
          //       options: { params: { search: "hi" } },
          //     })
          // );
          // queryConversations.refetch({
          //   options: { params: { search: "hi" } },
          // });
          setOptions({ sss: "hi" });
        }}
      >
        refetch
      </button>
    </div>
  );
};

export default ConversationsPage;
