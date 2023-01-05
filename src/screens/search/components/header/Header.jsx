"use client";

import { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

// rework

// STYLES
const classes = {};

const Header = ({ placeholder, textInputProps = {}, getRequest, styles }) => {
  // HOOKS

  // STATES
  const [search, setSearch] = React.useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // FUNCTIONS
  const clearSearch = () => {
    setSearch("");
  };
  const onChangeText = (value) => {
    setSearch(value);
  };

  // USEEFFECTS
  useEffect(() => {
    getRequest &&
      getRequest({
        params: {
          search: debouncedSearchValue,
        },
      });
  }, [debouncedSearchValue]);

  return <></>;
};

export default Header;
