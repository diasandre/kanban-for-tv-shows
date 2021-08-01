import React from "react";
import { Container, Title, List } from "./style";
import ItemWrapper from "../Item";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";

const ColumnWrapper = ({ id, title, index, items }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Column id={id} title={title} items={items} provided={provided} />
      )}
    </Draggable>
  );
};

const Column = ({
  id,
  title,
  items,
  provided: { draggableProps, dragHandleProps, innerRef },
}) => {
  return (
    <Container {...draggableProps} ref={innerRef}>
      <Title {...dragHandleProps}>{title}</Title>
      <Droppable droppableId={id} type="item">
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            <ColumnItems items={items} />
            <Button variant="outline-secondary">+</Button>
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
  );
};

const ColumnItems = React.memo(({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <ItemWrapper
          key={item.id}
          id={item.id}
          index={index}
          content={item.content}
        />
      ))}
    </>
  );
});

export default ColumnWrapper;
