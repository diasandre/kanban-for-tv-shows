import React, { useState } from "react";
import ColumnWrapper from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  getUpdatedColumn,
  hasToUpdate,
  updateColumnOrder,
} from "../../helpers/columnUpdateHelper";
import produce from "immer";
import { Container } from "./style";
import { initialData } from "../../initialData";

const Kanban = () => {
  const [data, setData] = useState(initialData);
  const { items, columns, columnOrder } = data;

  const handleUpdate = (result) => {
    switch (result.type) {
      case "column":
        handleColumnUpdate(result);
        break;
      default:
        handleItemsUpdate(result);
    }
  };

  const handleColumnUpdate = (result) => {
    const updatedData = produce(data, (draft) => {
      draft.columnOrder = updateColumnOrder(result, columnOrder);
    });
    setData(updatedData);
  };

  const handleItemsUpdate = (result) => {
    if (hasToUpdate(result)) {
      const updatedData = produce(data, (draft) => {
        draft.columns = getUpdatedColumn(result, columns);
      });
      setData(updatedData);
    }
  };

  return (
    <DragDropContext onDragEnd={handleUpdate}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, index) => {
              const { title, ids } = columns[columnId];
              const columnItems = ids.map((id) => items[id]);
              return (
                <ColumnWrapper
                  key={columnId}
                  id={columnId}
                  index={index}
                  title={title}
                  items={columnItems}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
