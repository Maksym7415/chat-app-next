import { useQuery } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { pathBackSearch } from "@/core/constants/urlBack";
import { useSearchStore } from "@/storeZustand/search/store";
import { getFetcher } from "../fetchers";
import { store } from "@/store/store";
import { setSearchContactsAction } from "@/store/search/slice";

// GetSearchContactsQuery
export const useGetSearchContactsQuery = (options) => {
  const setData = useCallback((data) => {
    useSearchStore.getState().setSearchContactsAction(data);
  }, []);

  const params = {};

  const searchParams = options?.params?.searchRequest || "";
  const offsetParams = options?.params?.offset || 0;

  if (searchParams) {
    params.searchRequest = searchParams;
  }
  if (offsetParams) {
    params.offset = offsetParams;
  }

  // console.log(params, "params");
  const queryData = useQuery({
    queryKey: [`get_${pathBackSearch.searchContact}`, params],
    queryFn: async () =>
      await getFetcher({
        url: pathBackSearch.searchContact,
        options: { params },
      }),
    retry: 0,
    staleTime: Infinity,
    keepPreviousData: true,
    onSuccess(response) {
      console.log(response, "onSuccess");
      // useSearchStore.getState().setSearchContactsAction({
      //   search: searchParams,
      //   direction: options?.direction || "",
      //   offset: offsetParams,

      //   ...response?.data,
      // });
      // options?.cb && options.cb(response?.data);
      return response;
    },

    onError(error) {
      options?.errorCb && options.errorCb(error.data);

      console.log(error, "onError");
      console.dir(error, "onError dir");
      return error;
    },
  });

  // let data = {
  //   response: [],
  //   limit: 0,
  // };

  // if (queryData.data?.data) {
  //   data = queryData.data?.data;
  // }

  const newData = {
    search: searchParams,
    direction: options?.direction || "",
    offset: offsetParams,

    ...queryData.data?.data,
  };

  console.log(newData, "newData");
  console.log(
    useSearchStore.getState().searchContacts,
    "useSearchStore.getState().searchContacts"
  );
  if (
    JSON.stringify(newData) !==
    JSON.stringify(useSearchStore.getState().searchContacts)
  ) {
    console.log("__setting__");
    // setData({
    //   search: searchParams,
    //   direction: options?.direction || "",
    //   offset: offsetParams,

    //   ...queryData.data?.data,
    // });
    useSearchStore.getState().setSearchContactsAction({
      search: searchParams,
      direction: options?.direction || "",
      offset: offsetParams,

      ...queryData.data?.data,
    });

    store.dispatch(setSearchContactsAction(newData));
  }
  // console.log(queryData, "queryData.data");
  return queryData;
};

// let data = {
//   response: [],
//   limit: 0,
// };

// if (queryData.data?.data) {
//   data = queryData.data?.data;
// }

// const newData = {
//   search: searchParams,
//   direction: options?.direction || "",
//   offset: offsetParams,

//   ...queryData.data?.data,
// };

// console.log(newData, "newData");
// console.log(
//   useSearchStore.getState().searchContacts,
//   "useSearchStore.getState().searchContacts"
// );
// if (
//   JSON.stringify(newData) !==
//   JSON.stringify(useSearchStore.getState().searchContacts)
// ) {
//   console.log("__setting__");
//   // setData(newData);
//   useSearchStore.getState().setSearchContactsAction({ ...newData });

//   store.dispatch(setSearchContactsAction(newData));
// }
