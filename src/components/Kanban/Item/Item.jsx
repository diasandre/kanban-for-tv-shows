import React from "react";
import { Container } from "./style";
import { Draggable } from "react-beautiful-dnd";

const ItemWrapper = ({ id, index, content }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => <Item content={content} provided={provided} />}
    </Draggable>
  );
};

const Item = React.memo(
  ({ content, provided: { draggableProps, dragHandleProps, innerRef } }) => {
    return (
      <Container {...draggableProps} {...dragHandleProps} ref={innerRef}>
        {content}
      </Container>
    );
  }
);

export default ItemWrapper;
