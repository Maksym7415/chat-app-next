import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useQuery } from "@tanstack/react-query";
import API from "@/core/axios/index";
import { pathBackSearch } from "@/core/constants/urlBack";
import { useSearchStore } from "@/storeZustand/search/store";

// export const getSearchContactFetcher = async ({ url, options, ...rest }) => {
export const getSearchContactFetcher = async ([url, params]) => {
  try {
    const response = await API.get(url, {
      params,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SearchService = {
  async useGetUserConversations(options) {
    console.log(options, "----options");
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

    const { data, error, isLoading, mutate } = await useSWRImmutable(
      [pathBackSearch.searchContact, params],
      getSearchContactFetcher
    );

    if (
      data?.response &&
      JSON.stringify(data?.response) !==
        JSON.stringify(useSearchStore.getState().searchContacts?.response)
    ) {
      options?.cb && options.cb();

      useSearchStore.getState().setSearchContactsAction({
        search: searchParams,
        direction: directionAddResponse,
        offset: offsetParams,

        ...data,
      });
    }

    return {
      data,
      isLoading,
      error,
      mutate,
    };
  },
};
