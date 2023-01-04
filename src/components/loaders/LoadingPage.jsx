"use client";

import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
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
