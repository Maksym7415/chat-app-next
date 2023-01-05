"use client";

import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import useStyles from "./styles";
import { useDebounce } from "@/hooks/useDebounce";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { useAppStore } from "@/storeZustand/app/store";

const classes = {
  inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};
function TopCenterComponent({ parentSettings }) {

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

  // FUNCTIONS
  const onChangeText = (e) => {
    setSearch(e.target.value);
  };

  const getRequest = () => {
    parentSettings.getRequest &&
      parentSettings.getRequest({
        params: {
          search: debouncedSearchValue,
        },
      });
  };

  // USEEFFECTS
  useEffect(() => {
    getRequest();
  }, [debouncedSearchValue]);

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
    </>
  );
}

export default TopCenterComponent;
