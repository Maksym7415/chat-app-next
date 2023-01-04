"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Header from "./components/header";
import SearchMain from "./components/searchMain";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "@/core/constants/general";
import { getSearchContactRequest } from "@/store/search/requests";
import { actionCreateNewConversation } from "@/actions/conversations";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { useAppStore } from "@/storeZustand/app/store";

// STYLES
const classes = {
  container: "flex-1 overflow-y-auto bg-white",
};

const Search = ({ params }) => {
  // HOOKS
  const router = useRouter();

  const { setSideLeftConfigAction } = useAppStore(
    (state) => ({
      setSideLeftConfigAction: state.setSideLeftConfigAction,
    }),
    shallow
  );

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
    header: {
      placeholder: "Search",
      getRequest: "",
      styles: {
        headerLayout: {},
      },
    },
  });

  // USEEFFECTS
  useEffect(() => {
    // set setting options from screen
    switch (params?.from) {
      case TYPES_FROM_TO_SEARCH_SCREEN.main:
        return setSettings(() => ({
          header: {
            placeholder: "Search",
            getRequest: getSearchContactRequest,
          },
        }));
      case TYPES_FROM_TO_SEARCH_SCREEN.profile:
        return setSettings(() => ({
          header: {
            placeholder: "Search settings and questions",
            getRequest: null,
            svgFill: "#ffffff",
            textInputProps: {
              placeholderTextColor: "#ffffff",
              activeUnderlineColor: "#ffffff",
            },
          },
        }));
      default:
        return null;
    }
  }, []);

  if (settings.noSettings) {
    return <></>;
  }

  return (
    <div className={classes.container}>
      {![TYPES_FROM_TO_SEARCH_SCREEN.main].includes(params?.from) && (
        <Header
          placeholder={settings.header.placeholder}
          getRequest={settings.header.getRequest}
          textInputProps={settings.header.textInputProps}
          styles={settings.header.styles}
          svgFill={settings.header?.svgFill || "#868686"}
        />
      )}
      {(() => {
        switch (params?.from) {
          case TYPES_FROM_TO_SEARCH_SCREEN.main:
            return (
              <SearchMain
                onClickContact={(item) => {
                  actionCreateNewConversation(router, item);

                  setSideLeftConfigAction({
                    page: SIDE_LEFT_TYPE_CONTENT.conversations,
                  });
                }}
              />
            );

          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default Search;
