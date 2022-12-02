import React, { useReducer, useState } from "react";
import { TodoComment } from "typescript";
import { v4 as uuidv4 } from "uuid";
import Buttons from "./Buttons";
import buttonReducer from "./reduce/buttonReducer";

interface task {
  id: string;
  task: string;
  complete: boolean;
}

const initialTodos: task[] = [
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
  const [taskvalue, setTask] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  // const [todo, settodo] = useState(null)
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const submitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskvalue.trim().length) {
      const newTask = {
        id: uuidv4(),
        task: taskvalue,
        complete: false,
      };

      setTodos([...todos, newTask]);
      setTask("");
    }
  };

  const handleChangeCheckbox = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  const [filter, dispatchFilter] = useReducer(buttonReducer, "ALL");

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }

    return false;
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
          filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>{todo.task}</label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleChangeCheckbox(todo.id)}
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
