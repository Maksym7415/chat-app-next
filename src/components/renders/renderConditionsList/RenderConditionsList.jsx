import React from "react";
import { CircularProgress } from "@mui/material";

// STYLES
const classes = {
  boxCenter: "flex items-center justify-center h-full",
  noResults: "text-[20px] font-semibold",
};

const RenderConditionsList = ({
  list = [],
  isLoading = false,
  noResultsText = "No results",
  styles = {
    boxCenter: {},
    noResults: {},
  },
}) => {
  // RENDER CONDITIONS
  if (isLoading) {
    return (
      <div className={classes.boxCenter} style={styles?.boxCenter}>
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!list.length) {
    return (
      <div className={classes.boxCenter} style={styles?.boxCenter}>
        <p className={classes.noResults} style={styles?.noResults}>
          {noResultsText}
        </p>
      </div>
    );
  }
};

export default RenderConditionsList;
