export const hasToUpdate = ({ destination, source }) => {
  return (
    destination &&
    (destination.droppableId !== source.droppableId ||
      (destination.droppableId === source.droppableId &&
        destination.index !== source.index))
  );
};

export const getUpdatedColumn = (
  { destination, source, type, draggableId },
  columns
) => {
  if (source.droppableId === destination.droppableId) {
    return updateToSameColumn(source, destination, draggableId, columns);
  } else {
    return updateToAnotherColumn(source, destination, draggableId, columns);
  }
};

const updateToSameColumn = (source, destination, itemId, columns) => {
  const column = columns[source.droppableId];
  const ids = column.ids.filter((item) => item !== itemId);

  const newIds = [
    ...ids.slice(0, destination.index),
    itemId,
    ...ids.slice(destination.index, ids.length),
  ];

  const newColumn = generateColumn(column, newIds);

  return {
    ...columns,
    [newColumn.id]: newColumn,
  };
};

const updateToAnotherColumn = (source, destination, itemId, columns) => {
  const sourceColumn = columns[source.droppableId];
  const destinationColumn = columns[destination.droppableId];
  const sourceNewIds = sourceColumn.ids.filter((item) => item !== itemId);

  const destinationNewIds = [
    ...destinationColumn.ids.slice(0, destination.index),
    itemId,
    ...destinationColumn.ids.slice(
      destination.index,
      destinationColumn.ids.length
    ),
  ];

  const newSourceColumn = generateColumn(sourceColumn, sourceNewIds);
  const newDestinationColumn = generateColumn(
    destinationColumn,
    destinationNewIds
  );

  return {
    ...columns,
    [newSourceColumn.id]: newSourceColumn,
    [newDestinationColumn.id]: newDestinationColumn,
  };
};

const generateColumn = (column, ids) => {
  return {
    ...column,
    ids,
  };
};

export const updateColumnOrder = (
  { destination, source, draggableId },
  columnOrder
) => {
  const newColumnOrder = Array.from(columnOrder);
  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);
  return newColumnOrder;
};
