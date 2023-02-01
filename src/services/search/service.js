import { useQuery } from "react-query";
import { pathBackSearch } from "@/core/constants/urlBack";
import { fetchers } from "../fetchers";
import { queryClient } from "@/pages/_app";
import { store } from "@/store/store";
import { setSearchContactsAction } from "@/store/search/slice";
import { searchKeysQuery } from "@/services/keysQuery";
import { standardOnError } from "@/services/helpers";

export const GetSearchContactsQuery = (options) => {
  const params = {};

  const searchParams = options?.params?.searchRequest || "";
  const offsetParams = options?.params?.offset || 0;

  if (searchParams) {
    params.searchRequest = searchParams;
  }
  if (offsetParams) {
    params.offset = offsetParams;
  }

  const queryData = useQuery({
    queryKey: [searchKeysQuery.searchContact, params],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackSearch.searchContact,
        params,
      }),
    staleTime: Infinity,
    onError(errorRes) {
      standardOnError({ error: errorRes, options });
    },
  });

  let data = {
    limit: 0,
    response: [],
  };

  if (queryData.data?.data) {
    data = queryData.data?.data;
  }

  const newData = {
    search: searchParams,
    direction: options?.direction || "",
    offset: offsetParams,
    ...data,
  };

  if (
    JSON.stringify(newData?.response) !==
    JSON.stringify(store.getState().searchSlice.searchContacts?.response)
  ) {
    console.log("sss");
    store.dispatch(setSearchContactsAction(newData));
  }

  return queryData;
};

// fetchQuery
export const getSearchContactsQuery = async (params) => {
  return await queryClient.fetchQuery({
    queryKey: [searchKeysQuery.searchContact, params],
    queryFn: async () =>
      await fetchers({
        method: "get",
        url: pathBackSearch.searchContact,
        params,
      }),
    type: "active",
  });
};
