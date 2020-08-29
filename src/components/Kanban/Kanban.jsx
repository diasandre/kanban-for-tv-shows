import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const rawData = {
  items: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      ids: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

const Kanban = () => {
  const [data, setData] = useState(rawData);
  const { items, columns, columnOrder } = data;

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnOrder.map((columnId) => {
        const column = columns[columnId];
        const columnItems = column.ids.map((taskId) => items[taskId]);
        return <Column key={column.id} column={column} items={columnItems} />;
      })}
    </DragDropContext>
  );
};

export default Kanban;
