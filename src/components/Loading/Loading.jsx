import { CircularProgress } from "@mui/material";
import React from "react";
import { LoadingContainer } from "./style";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
