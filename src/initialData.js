export const initialData = {
  items: {
    1: { id: "1", content: "Breaking bad" },
    2: { id: "2", content: "Homeland" },
    3: { id: "3", content: "Modern love" },
    4: { id: "4", content: "Rick and Morty" },
    5: { id: "5", content: "Friends" },
    6: { id: "6", content: "Family guy" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To watch",
      ids: ["1", "2", "3", "4"],
    },
    "column-2": {
      id: "column-2",
      title: "Watching",
      ids: ["5", "6"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

export const defaultInitialData = {
  items: null,
  columns: null,
  columnOrder: [],
};
