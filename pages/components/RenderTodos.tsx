import React from "react";
import taskInterface from "../../interfaces/taskInterfaces";

const RenderTodos = ({ dispatch, todos }) => {
  const handleChangeCheckbox = (todo: taskInterface) => {
    dispatch({
      type: todo.complete ? "INCOMPLETE_TASK" : "COMPLETE_TASK",
      payload: { todo },
    });
  };

  return (
    <ul>
      {todos?.length ? (
        todos.map((todo: taskInterface) => {
          return (
            <li key={todo.id}>
              <label>{todo.task}</label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo)}
              />
            </li>
          );
        })
      ) : (
        <a>Sorry You have no active todos</a>
      )}
    </ul>
  );
};

export default RenderTodos;
