import { useCallback, useLayoutEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { searchApi } from "@/services/search/serviceRedux";
import { setSearchContactsAction } from "@/store/search/slice";

// STYLES
const classes = {
  inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};
function TopCenterComponent({ parentSettings }) {
  const dispatch = useDispatch();

  // STORE
  const sideLeftConfig = useSelector(({ appSlice }) => appSlice.sideLeftConfig);

  // SELECTORS
  const [search, setSearch] = useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // VARIABLES
  const params = useMemo(() => {
    const paramsLoc = {};
    const searchRequest = debouncedSearchValue;

    if (searchRequest) {
      paramsLoc.searchRequest = searchRequest;
    }

    return paramsLoc;
  }, [debouncedSearchValue]);

  // SERVICES
  const {} = searchApi.useGetSearchContactsQuery({
    params,
  });

  useLayoutEffect(() => {
    dispatch(
      setSearchContactsAction({
        search: debouncedSearchValue,
        offset: 0,
        direction: "",
        limit: 0,
      })
    );
  }, [debouncedSearchValue]);

  // FUNCTIONS
  const onChangeText = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

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
