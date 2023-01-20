"use client";

import { useCallback, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { useAppStore } from "@/storeZustand/app/store";

import {
  SearchService,
  getSearchContactFetcher,
  useSearchContactFetcher,
} from "@/services/search/search.service";
import { useGetSearchContactsQuery } from "@/services/search/service";
import { useSearchStore } from "@/storeZustand/search/store";

// STYLES
const classes = {
  inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};
function TopCenterComponent({ parentSettings }) {
  // STORE
  const { sideLeftConfig } = useAppStore(
    (state) => ({
      sideLeftConfig: state.sideLeftConfig,
    }),
    shallow
  );

  // STATES
  const [search, setSearch] = useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // SearchService.useGetUserConversations({
  //   params: {
  //     search: debouncedSearchValue,
  //   },
  // });

  const {} = useGetSearchContactsQuery({
    params: {
      searchRequest: debouncedSearchValue,
    },
  });

  // console.log(queryData, "queryData");

  // FUNCTIONS
  const onChangeText = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const getRequest = () => {
    // parentSettings.getRequest &&
    //   parentSettings.getRequest({
    //     params: {
    //       search: debouncedSearchValue,
    //     },
    //   });
  };

  // USEEFFECTS
  // useEffect(() => {
  //   getRequest();
  // }, [debouncedSearchValue]);

  // useEffect(() => {
  //   getRequest();
  // }, [parentSettings]);

  return (
    <>
      {(() => {
        if (
          [
            SIDE_LEFT_TYPE_CONTENT.conversations,
            SIDE_LEFT_TYPE_CONTENT.searchContacts,
          ].includes(sideLeftConfig.page)
        ) {
          return (
            <OutlinedInput
              id="outlined-adornment-weight"
              value={search}
              onChange={onChangeText}
              placeholder={parentSettings.placeholder}
              className={classes.inputSearch}
              startAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              onFocus={parentSettings.onFocus}
            />
          );
        }
      })()}
      <button
        onClick={() => {
          useSearchStore.getState().setCountAction(1);

          useSearchStore.getState().setSearchContactsAction({
            response: [
              {
                id: 2,
                login: "pwoolam1@nhs.uk",
                firstName: "Petronia",
                lastName: "Woolam",
                tagName: "pwoolam1",
                fullName: "Petronia Woolam",
                status: "Available",
                verificationCode: null,
                userAvatar: null,
                userCreationTime: "2022-12-18T08:54:10.000Z",
                userUpdateTime: null,
                userLastTimeOnline: null,
                lang: "en",
              },
            ],
            limit: 10,
          });
        }}
      >
        count
      </button>
    </>
  );
}

export default TopCenterComponent;
