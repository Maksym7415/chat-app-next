import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { GetSearchContactsQuery } from "@/services/search/service";
import { setSideLeftConfigAction } from "@/store/app/slice";

// STYLES
const classes = {
  inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};
function TopCenterComponent({ parentSettings }) {
  // STORE
  const sideLeftConfig = useSelector(({ appSlice }) => appSlice.sideLeftConfig);

  // STATES
  const [search, setSearch] = useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  const {} = GetSearchContactsQuery({
    params: {
      searchRequest: debouncedSearchValue,
    },
  });

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
    </>
  );
}

export default TopCenterComponent;
