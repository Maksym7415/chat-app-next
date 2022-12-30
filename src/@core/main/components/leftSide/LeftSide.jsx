"use client";

import { useMemo, memo } from "react";
import { makeStyles } from "@mui/styles";
import Conversations from "@/screens/conversations/index";
import SearchPage from "@/screens/search";
import Header from "./components/header";
import {
  TYPES_FROM_TO_SEARCH_SCREEN,
  SIDE_LEFT_TYPE_CONTENT,
} from "@/config/constants/general";
import { useAppStore } from "@/storeZustand/app/store";
import shallow from "zustand/shallow";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
  },
}));

const LeftSide = () => {
  // HOOKS
  const classes = useStyles();

  const { sideLeftConfig } = useAppStore(
    (state) => ({
      sideLeftConfig: state.sideLeftConfig,
    }),
    shallow
  );

  // RENDERS
  const renderContent = useMemo(() => {
    const heightContent = `calc(100vh - ${0}px)`;

    switch (sideLeftConfig.page) {
      case SIDE_LEFT_TYPE_CONTENT.conversations:
        return <Conversations heightContent={heightContent} />;
      case SIDE_LEFT_TYPE_CONTENT.searchContacts:
        return (
          <SearchPage
            params={{
              from: TYPES_FROM_TO_SEARCH_SCREEN.main,
            }}
            heightContent={heightContent}
          />
        );
      default:
        return <></>;
    }
  }, [sideLeftConfig]);

  return (
    <div className={classes.container}>
      <Header />
      {renderContent}
    </div>
  );
};
export default memo(LeftSide);
