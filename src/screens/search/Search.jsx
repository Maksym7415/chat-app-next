import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Header from "./components/header";
import SearchMain from "./components/searchMain";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "@/config/constants/general";
import { getSearchContactRequest } from "@/store/search/requests";
import { actionCreateNewConversation } from "@/actions/conversations";
import { setSideLeftConfigAction } from "@/store/app/slice";
import { SIDE_LEFT_TYPE_CONTENT } from "@/config/constants/general";

import { useDispatch, useSelector } from "react-redux";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "auto",
  },
}));

const Search = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
    header: {
      placeholder: "Search",
      getRequest: "",
      styles: {
        headerLayout: {},
      },
    },
  });

  // USEEFFECTS
  useEffect(() => {
    // set setting options from screen
    switch (params?.from) {
      case TYPES_FROM_TO_SEARCH_SCREEN.main:
        return setSettings(() => ({
          header: {
            placeholder: "Search",
            getRequest: getSearchContactRequest,
          },
        }));
      case TYPES_FROM_TO_SEARCH_SCREEN.profile:
        return setSettings(() => ({
          header: {
            placeholder: "Search settings and questions",
            getRequest: null,
            svgFill: "#ffffff",
            textInputProps: {
              placeholderTextColor: "#ffffff",
              activeUnderlineColor: "#ffffff",
            },
          },
        }));
      default:
        return null;
    }
  }, []);

  if (settings.noSettings) {
    return <></>;
  }

  return (
    <div className={classes.container}>
      {![TYPES_FROM_TO_SEARCH_SCREEN.main].includes(params?.from) && (
        <Header
          placeholder={settings.header.placeholder}
          getRequest={settings.header.getRequest}
          textInputProps={settings.header.textInputProps}
          styles={settings.header.styles}
          svgFill={settings.header?.svgFill || "#868686"}
        />
      )}
      {(() => {
        switch (params?.from) {
          case TYPES_FROM_TO_SEARCH_SCREEN.main:
            return (
              <SearchMain
                onClickContact={(item) => {
                  // actionCreateNewConversation(history, item);
                  dispatch(
                    setSideLeftConfigAction({
                      page: SIDE_LEFT_TYPE_CONTENT.conversations,
                    })
                  );
                }}
              />
            );

          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default Search;
