import React, { createContext, useContext } from "react";

const TodoContext = createContext(null);

const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ value, children }) => {
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoProvider, useTodo };
