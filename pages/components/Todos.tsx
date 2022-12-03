import React, { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import taskInterface from "../../interfaces/taskInterfaces";
import buttonReducer from "../../reducer/buttonReducer";
import todoReducer from "../../reducer/todoReducer";

const initialTodos: taskInterface[] = [
  {
    id: uuidv4(),
    task: "Learn React",
    complete: true,
  },
  {
    id: uuidv4(),
    task: "Learn Firebase",
    complete: true,
  },
  {
    id: uuidv4(),
    task: "Learn GraphQL",
    complete: false,
  },
];

const Todos = () => {
  const [filter, dispatchFilter] = useReducer(buttonReducer, "ALL");

  const [todos, dispatchTodo] = useReducer(todoReducer, initialTodos);

  const [taskvalue, setTask] = useState("");
  // const [todos, setTodos] = useState(initialTodos);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const submitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskvalue.trim().length) {
      setTask("");

      const newTask = {
        id: uuidv4(),
        task: taskvalue,
        complete: false,
      };
      dispatchTodo({ type: "ADD_TODO", payload: { todo: newTask } });
    }
  };

  const handleChangeCheckbox = (todo: taskInterface) => {
    dispatchTodo({
      type: todo.complete ? "INCOMPLETE_TASK" : "COMPLETE_TASK",
      payload: { todo },
    });
  };

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };
  const filteredTodos = todos.filter((todo: taskInterface) => {
    switch (filter) {
      case "ALL":
        return true;
      case "COMPLETE":
        return todo.complete ? true : false;
      case "INCOMPLETE":
        return todo.complete ? false : true;
      default:
        return true;
    }
  });

  return (
    <div>
      <div className="Buttons">
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>

      <ul>
        {filteredTodos.length ? (
          filteredTodos.map((todo: taskInterface) => {
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
      <form onSubmit={submitTodo}>
        <input
          type="text"
          placeholder="Enter your task here"
          value={taskvalue}
          onChange={handleChangeInput}
        />
      </form>
    </div>
  );
};

export default Todos;
