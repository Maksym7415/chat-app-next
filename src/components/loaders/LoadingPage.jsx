"use client";

import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <CircularProgress size={60} />
      </div>
    </div>
  );
};

export default LoadingPage;
