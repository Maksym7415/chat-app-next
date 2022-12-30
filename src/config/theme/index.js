import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { colors } from "./config/colors";

let theme = createTheme({
  colors: {
    ...colors.gray_light,
    ...colors.white,
    ...colors.black,
    ...colors.red,
    ...colors.yellow,
    ...colors.green_medium,
    ...colors.green_bright,

    ...colors.gray_light,
    ...colors.steel_gray_light,
    ...colors.blue_light,
    ...colors.green_light,
    ...colors.light,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
          "scrollbar-color": "rgba(0,0,0,.1) rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar": {
          width: "0.4em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#feffff",
        color: "#64c8bc",
      },
      root: {
        height: "64px",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#64c8bc",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
      label: {
        color: "#323536",
      },
    },
    MuiIconButton: {
      label: {
        width: "30px",
        height: "30px",
      },
    },
    MuiSvgIcon: {
      root: {
        width: "30px",
        height: "30px",
      },
    },
    MuiTypography: {
      root: {
        color: "#0000007a",
      },
      subtitle1: {
        fontFamily: "san-serif-lato",
        color: "#323536",
      },
    },
    MuiBadge: {
      colorSecondary: {
        backgroundColor: "#ef2f8bf5",
        color: "#ffffff",
      },
    },
  },
  palette: {
    primary: {
      main: "#64c8bc",
    },
    secondary: {
      main: "#feffff",
    },
  },
  shape: {
    borderRadius: 6,
  },
});
theme = responsiveFontSizes(theme);

const cache = createCache({
  key: "css",
  prepend: true,
});

function Theme(props) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CacheProvider>
  );
}

export default Theme;
