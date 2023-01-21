import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Providers from "@/providers/MainProvider";

import "../styles/globals.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        // toast.error(`Something went wrong: ${error.message}`)
      }
    },
  }),
});

export default function App({ Component, pageProps }) {
  // const queryClient = React.useRef(
  //   new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         refetchOnWindowFocus: false,
  //       },
  //     },
  //   })
  // );

  return (
    // <Provider createStore={createStore}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Providers Component={Component}>
          <ReactQueryDevtools initialIsOpen={true} />
          <Component {...pageProps} />
        </Providers>
      </Hydrate>
    </QueryClientProvider>
    // </Provider>
  );
}
