import React from "react";
import useStyles from "./styles";

// need ts

const RITitleWithSubtitleAndRightComponent = ({
  title = "",
  subTitle = "",
  renderRightComponent = null,
  onPressWrapperItemLeft = () => {},
  styles = {
    wrapperItem: {},
    wrapperItemLeft: {},
    title: {},
    subTitle: {},
  },
}: any) => {
  // HOOKS
  const classesRoot = useStyles();

  return (
    <div
      className={classesRoot.wrapperItem}
      style={{
        justifyContent: renderRightComponent ? "space-between" : null,
        ...styles.wrapperItem,
      }}
    >
      <div
        onClick={onPressWrapperItemLeft}
        className={classesRoot.wrapperItemLeft}
        style={{
          ...styles.wrapperItemLeft,
        }}
      >
        <p
          className={classesRoot.title}
          style={{
            ...styles.title,
          }}
        >
          {title}
        </p>
        {subTitle ? (
          <p
            className={classesRoot.subTitle}
            style={{
              ...styles.subTitle,
            }}
          >
            {subTitle}
          </p>
        ) : null}
      </div>
      {renderRightComponent ? renderRightComponent() : null}
    </div>
  );
};
export default RITitleWithSubtitleAndRightComponent;
