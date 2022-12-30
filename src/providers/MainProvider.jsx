"use client";

import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "@/config/theme";
import { store } from "src/reduxToolkit/store";
import AuthProvider from "./AuthProvider";

const cache = createCache({
  key: "css",
  prepend: true,
});

const MainProvider = ({ session, children }) => {
  return (
    <Theme>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </Theme>
  );
};

export default MainProvider;
