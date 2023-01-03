"use client";

import { Typography } from "@mui/material";
import shallow from "zustand/shallow";
import languages from "@/config/translations";
import { useSettingStore } from "@/storeZustand/setting/store";

const ChatClientPage = () => {
  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Typography className={"text-[28px] font-medium"}>
        {languages[lang].mainScreen.chooseAChat}
      </Typography>
    </div>
  );
};

export default ChatClientPage;
