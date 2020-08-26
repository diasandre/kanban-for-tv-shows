import React from "react";

export const defaultUserContext = {
  user: null,
};

export const UserContext = React.createContext(defaultUserContext);

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
