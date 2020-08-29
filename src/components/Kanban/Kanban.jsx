import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { getUpdatedColumn, hasToUpdate } from "../../helpers/columnUpdateHelper";
import produce from "immer";

const rawData = {
  items: {
    1: { id: "1", content: "Breaking bad" },
    2: { id: "2", content: "Homeland" },
    3: { id: "3", content: "Modern love" },
    4: { id: "4", content: "Rick and Morty" },
    5: { id: "5", content: "Friends" },
    6: { id: "6", content: "Family guy" },
  },
  columns: {
    1: {
      id: "1",
      title: "To watch",
      ids: ["1", "2", "3", "4"],
    },
    2: {
      id: "2",
      title: "Watching",
      ids: ["5", "6"],
    },
  },
  columnOrder: ["1", "2"],
};

const Kanban = () => {
  const [data, setData] = useState(rawData);
  const { items, columns, columnOrder } = data;

  const handleUpdate = (result) => {
    if (hasToUpdate(result)) {
      const updatedData = produce(data, (draft) => {
        draft.columns = getUpdatedColumn(result, columns);
      });
      setData(updatedData);
    }
  };

  return (
    <DragDropContext onDragEnd={handleUpdate}>
      {columnOrder.map((columnId) => {
        const { title, ids } = columns[columnId];
        const columnItems = ids.map((id) => items[id]);
        return (
          <Column
            key={columnId}
            id={columnId}
            title={title}
            items={columnItems}
          />
        );
      })}
    </DragDropContext>
  );
};

export default Kanban;
