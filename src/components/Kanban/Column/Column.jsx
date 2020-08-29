import React from "react";
import { Container, Title, List } from "./style";
import Item from "../Item";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, items }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Item id={item.id} index={index} content={item.content} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
