"use client";

import { useState, memo, useEffect } from "react";
import shallow from "zustand/shallow";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { useAppStore } from "@/storeZustand/app/store";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import {
  SearchService,
  getSearchContactFetcher,
} from "@/services/search/search.service";

// STYLES
const classes = {
  container: "px-[8px] py-[15px]",
  containerTop: "flex",
  wrapperTopCenterComponent: "flex",
};

// rework

const Header = ({ children }) => {
  const {} = SearchService.useGetUserConversations();

  // STORE
  const { sideLeftConfig, setSideLeftConfigAction } = useAppStore(
    (state) => ({
      sideLeftConfig: state.sideLeftConfig,
      setSideLeftConfigAction: state.setSideLeftConfigAction,
    }),
    shallow
  );

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
    topCenterComponent: {
      placeholder: "Search",
      getRequest: "",
      styles: {
        headerLayout: {},
      },
    },
  });

  // FUNCTIONS
  const newSideLeftConfigSet = () => {
    switch (sideLeftConfig.page) {
      case SIDE_LEFT_TYPE_CONTENT.conversations:
        return setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            onFocus: () => {
              setSideLeftConfigAction({
                page: SIDE_LEFT_TYPE_CONTENT.searchContacts,
              });
            },
          },
        }));

      case SIDE_LEFT_TYPE_CONTENT.searchContacts:
        setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            getRequest: (options) => {
              getSearchContactFetcher({
                options,
              });
            },
          },
        }));
        return;
      default:
        return null;
    }
  };
  // USEEFFECTS
  useEffect(() => {
    // set setting options from screen
    newSideLeftConfigSet();
  }, [sideLeftConfig]);

  return (
    <div className={classes.container}>
      <div className={`${classes.containerTop} flex`}>
        <TopLeftComponent />
        <div className={classes.wrapperTopCenterComponent}>
          <TopCenterComponent parentSettings={settings.topCenterComponent} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default memo(Header);
