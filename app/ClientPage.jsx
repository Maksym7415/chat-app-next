"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import Main from "@/core/main";
import { useAuth } from "@/storeZustand/auth/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";

const MainClientPage = ({ token }) => {
  const { authTokenAction } = useAuth(
    (state) => ({
      authTokenAction: state.authTokenAction,
    }),
    shallow
  );
  const { getUserConversationsRequest } = useConversationsStore(
    (state) => ({
      getUserConversationsRequest: state.getUserConversationsRequest,
    }),
    shallow
  );

  useEffect(() => {
    getUserConversationsRequest();
    authTokenAction(token);
  }, []);

  return (
    <>
      {/* <div
      className={"flex items-center overflow-x-auto flex-nowrap py-5"}
      style={{ backgroundColor: "red" }}
    >
      Main
    </div> */}
      <Main />
    </>
  );
};

export default MainClientPage;
