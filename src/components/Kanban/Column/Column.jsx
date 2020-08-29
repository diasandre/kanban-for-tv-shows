import React from "react";
import { Container, Title, List } from "./style";
import Item from "../Item";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ id, title, items }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Item
                key={item.id}
                id={item.id}
                index={index}
                content={item.content}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
