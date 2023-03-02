import { useCallback, useLayoutEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { searchApi } from "@/store/search/api";

// STYLES
const classes = {
  inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};
function TopCenterComponent({ parentSettings }) {
  // STORE
  const sideLeftConfig = useSelector(({ appSlice }) => appSlice.sideLeftConfig);

  // SELECTORS
  const [search, setSearch] = useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // VARIABLES
  const params = useMemo(() => {
    const paramsLoc = {};
    const search = debouncedSearchValue;

    if (search) {
      paramsLoc.search = search;
    }

    return paramsLoc;
  }, [debouncedSearchValue]);

  // SERVICES
  searchApi.useGetSearchContactsQuery(
    {
      params: {
        searchRequest: params.search,
      },
    },
    {
      skip: parentSettings.type !== "searchContacts",
    }
  );

  // FUNCTIONS
  const onChangeText = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const getRequest = () => {
    parentSettings.getRequest &&
      parentSettings.getRequest({
        params,
      });
  };

  // USEEFFECTS
  useLayoutEffect(() => {
    getRequest();
  }, [debouncedSearchValue]);

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
