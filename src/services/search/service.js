import { useQuery } from "react-query";
import { pathBackSearch } from "@/core/constants/urlBack";
import { getFetcher } from "../fetchers";
import { store } from "@/store/store";
import { setSearchContactsAction } from "@/store/search/slice";

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
    queryKey: [`get_${pathBackSearch.searchContact}`, params],
    queryFn: async () =>
      await getFetcher({
        url: pathBackSearch.searchContact,
        options: { params },
      }),
    retry: 0,
    staleTime: Infinity,
    onError(error) {
      options?.errorCb && options.errorCb(error.data);
      console.dir(error, "onError dir");
      return error;
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
    store.dispatch(setSearchContactsAction(newData));
  }

  return queryData;
};
