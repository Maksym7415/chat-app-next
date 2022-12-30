import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const customStylesSelect = (styles) => ({
  container: (provided) => ({
    ...provided,
    ...styles?.container,
  }),
  option: (provided) => ({
    ...provided,
    ...styles?.option,
  }),
  control: (provided) => ({
    ...provided,
    minWidth: 200,
    width: "100%",
    ...styles?.control,
  }),
  singleValue: (provided, state) => {
    const transition = "opacity 300ms";
    return { ...provided, transition };
  },
});

// getSearchRequest = async (searchQuery, page) => {
//   const response = await getSearchRequest(searchQuery, page);
//     return {
//       options: response.payload.results,
//       count: response.payload.count,
//     }
// }

function SelectsAsyncPaginateSearch({
  setSelected,
  selected,
  settings,
  styles,
  placeholder = "Select",
}) {
  // FUNCTIONS
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const payload = await settings.getSearchRequest(searchQuery, page);
    const count = payload?.count || payload?.limit;

    if (!payload?.options || !count) return;

    let hasMore = false;

    if (payload?.limit) {
      hasMore = loadedOptions.length + payload.options.length >= payload.limit;
    } else {
      hasMore = loadedOptions.length + payload.options.length < payload?.count;
    }

    return {
      options: payload.options || [],
      hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  let settingsAsyncPaginate = {};
  if (settings) {
    const {
      getOptionValue,
      getOptionLabel,
      getSearchRequest,
      ...otherSettings
    } = settings;
    if (settings.getOptionValue)
      settingsAsyncPaginate.getOptionValue = settings.getOptionValue;
    if (settings.getOptionLabel)
      settingsAsyncPaginate.getOptionLabel = settings.getOptionLabel;
    if (settings.getSearchRequest)
      settingsAsyncPaginate.loadOptions = loadOptions;
    settingsAsyncPaginate = { ...settingsAsyncPaginate, ...otherSettings };
  }

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <AsyncPaginate
      debounceTimeout={700}
      styles={customStylesSelect(styles)}
      value={selected}
      onChange={onChange}
      placeholder={placeholder}
      additional={{
        page: 1,
      }}
      {...settingsAsyncPaginate}
    />
  );
}

export default SelectsAsyncPaginateSearch;
