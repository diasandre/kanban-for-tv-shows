import React from "react";
import { Container } from "./style";
import { Draggable } from "react-beautiful-dnd";

const Item = ({ id, index, content }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {content}
        </Container>
      )}
    </Draggable>
  );
};

export default Item;
