import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Providers from "@/providers/MainProvider";
import { wrapper } from "@/store/store";
import "../styles/globals.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    // onError: (error, query) => {
    //   // 🎉 only show error toasts if we already have data in the cache
    //   // which indicates a failed background update
    //   if (query.state.data !== undefined) {
    //     // toast.error(`Something went wrong: ${error.message}`)
    //   }
    //   console.dir(error, "queryClient");
    //   return error;
    // },
  }),
});

function App({ Component, ...rest }) {
  const { pageProps } = rest;

  return (
    // <Provider createStore={store}>
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
// export default App;
export default wrapper.withRedux(App);
