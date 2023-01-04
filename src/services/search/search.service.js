import useSWR from "swr";
import API from "@/core/axios/index";
import { pathBackSearch } from "@/core/constants/urlBack";
import { useSearchStore } from "@/storeZustand/search/store";

export const getSearchContactFetcher = async ({ url, options }) => {
  // useSearchStore.getState().setLoadingSearchContacts(true);
  const params = {};

  const directionAddResponse = options?.direction || "";

  const searchParams = options?.params?.search || "";
  const offsetParams = options?.params?.offset || 0;

  if (searchParams) {
    params.searchRequest = searchParams;
  }
  if (offsetParams) {
    params.offset = offsetParams;
  }

  try {
    console.log(options, "options");
    const response = await API.get(pathBackSearch.searchContact, {
      params,
    });
    console.log(response, "response");
    options?.cb && options.cb();

    useSearchStore.getState().setSearchContactsAction({
      search: searchParams,
      direction: directionAddResponse,
      offset: offsetParams,

      ...response.data,
    });

    return {
      search: searchParams,
      direction: directionAddResponse,
      offset: offsetParams,

      ...response.data,
    };
  } catch (error) {
    return Promise.reject(error);
  } finally {
    // useSearchStore.getState().setLoadingSearchContacts(false);
  }
};

export const SearchService = {
  async useGetUserConversations(options) {
    const { data, error, isLoading, mutate } = useSWR(
      ["http://localhost:5051/api/searchContact", options],
      (url, options) => getSearchContactFetcher(url, options),
      { revalidateOnFocus: false }
    );

    return {
      data,
      isLoading,
      error,
      mutate,
    };
  },
};
