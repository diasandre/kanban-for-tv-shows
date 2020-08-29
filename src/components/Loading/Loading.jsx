import React from "react";
import { Spinner } from "react-bootstrap";
import { LoadingContainer } from "./style";

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner animation="border" />
    </LoadingContainer>
  );
};

export default Loading;
