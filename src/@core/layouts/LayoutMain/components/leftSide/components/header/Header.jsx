import { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { setSideLeftConfigAction } from "@/store/app/slice";

// STYLES
const classes = {
  container: "px-[8px] py-[15px]",
  containerTop: "flex",
  wrapperTopCenterComponent: "flex",
};

// rework

const Header = ({ children }) => {
  const dispatch = useDispatch();
  // const {} = SearchService.useGetUserConversations();

  // SELECTORS
  const sideLeftConfig = useSelector(({ appSlice }) => appSlice.sideLeftConfig);
  const appSlice = useSelector(({ appSlice }) => appSlice);

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
    topCenterComponent: {
      placeholder: "Search",
      getRequest: "",
      styles: {
        headerLayout: {},
      },
    },
  });

  // FUNCTIONS
  const newSideLeftConfigSet = () => {
    switch (sideLeftConfig.page) {
      case SIDE_LEFT_TYPE_CONTENT.conversations:
        return setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            onFocus: () => {
              dispatch(
                setSideLeftConfigAction({
                  page: SIDE_LEFT_TYPE_CONTENT.searchContacts,
                })
              );
            },
          },
        }));

      case SIDE_LEFT_TYPE_CONTENT.searchContacts:
        setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            getRequest: (options) => {
              // getSearchContactFetcher({
              //   options,
              // });
            },
          },
        }));
        return;
      default:
        return null;
    }
  };
  // USEEFFECTS
  useEffect(() => {
    // set setting options from screen
    newSideLeftConfigSet();
  }, [sideLeftConfig]);

  return (
    <div className={classes.container}>
      <div className={`${classes.containerTop} flex`}>
        <TopLeftComponent />
        <div className={classes.wrapperTopCenterComponent}>
          <TopCenterComponent parentSettings={settings.topCenterComponent} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default memo(Header);
