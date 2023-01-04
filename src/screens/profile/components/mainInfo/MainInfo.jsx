"use client";
import { useState } from "react";
import { Switch, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import RITitleWithSubtitleAndRightComponent from "@/components/renders/rendersItem/RITitleWithSubtitleAndRightComponent";
import { TYPES_CONVERSATIONS } from "@/config/constants/general";

// need ts

const MainInfo = ({ typeProfile }) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // FUNCTIONS
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <div className={classes.wrapperList}>
      {(() => {
        switch (typeProfile) {
          case TYPES_CONVERSATIONS.dialog:
            return (
              <>
                <p className={classes.listTitle}>Data</p>
                <div className={classes.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={"+1 (234) 567 89 01*"}
                    subTitle={"Phone number"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                  <Divider className={classes.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={`I'm fine and you?*`}
                    subTitle={"About myself"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                  <Divider className={classes.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={"@voidrainbow*"}
                    subTitle={"Pseudonym"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                </div>
                <Divider className={classes.divider} />
              </>
            );
          case TYPES_CONVERSATIONS.group:
            return (
              <>
                <p className={classes.listTitle}>Вescription</p>
                <div className={classes.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={
                      "a spoken or written representation or account of a person, object, or event.*"
                    }
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                </div>
                <Divider className={classes.divider} />
              </>
            );
          default:
            return <></>;
        }
      })()}
      <RITitleWithSubtitleAndRightComponent
        title={"Notification"}
        subTitle={isSwitchOn ? "enabled" : "turned off"}
        styles={{
          wrapperItem: {
            paddingLeft: 0,
          },
          wrapperItemLeft: {},
          title: {},
          subTitle: {},
        }}
        renderRightComponent={() => {
          return (
            <div className={classes.wrapperNotification}>
              <Divider
                className={classes.dividerNotification}
                orientation="vertical"
                flexItem
              />
              <Switch
                value={isSwitchOn}
                onChange={onToggleSwitch}
                className={classes.switchNotification}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default MainInfo;
