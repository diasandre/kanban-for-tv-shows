import React, { useContext, useState, useEffect, useCallback } from "react";
import ColumnWrapper from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  getUpdatedColumn,
  hasToUpdate,
  updateColumnOrder,
} from "../../helpers/columnUpdateHelper";
import produce from "immer";
import { Container } from "./style";
import { load } from "../../services/kanbanService";
import { UserContext } from "../../contexts/UserContext";
import { defaultInitialData } from "../../initialData";

const Kanban = () => {
  const [data, setData] = useState(defaultInitialData);
  const { user } = useContext(UserContext);
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

  const listColumnsByUser = useCallback(async () => {
    const { data } = await load(user);
    setData({
      columns: data.columns,
      items: data.items,
      columnOrder: Object.keys(data.columns),
    });
  }, [user]);

  useEffect(() => {
    if (user != null) listColumnsByUser();
  }, [listColumnsByUser, user]);

  return (
    <>
      <DragDropContext onDragEnd={handleUpdate}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((columnId, index) => {
                const { title, items: columnItemIds } = columns[columnId];
                const columnItems = columnItemIds.map((id) => items[id]);
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
    </>
  );
};

export default Kanban;
