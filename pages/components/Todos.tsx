import React, { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import taskInterface from "../../interfaces/taskInterfaces";
import buttonReducer from "../../reducer/buttonReducer";
import todoReducer from "../../reducer/todoReducer";
import AddTodo from "./AddTodo";
import FilterButtons from "./FilterButtons";
import RenderTodos from "./RenderTodos";
import { TodoProvider } from "../context/todoContext";

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
    <TodoProvider value={dispatchTodo}>
      <div>
        <FilterButtons dispatch={dispatchFilter} />

        <RenderTodos todos={filteredTodos} />

        <AddTodo
          value={taskvalue}
          submitTask={submitTodo}
          handleInputChange={handleChangeInput}
        />
      </div>
    </TodoProvider>
  );
};

export default Todos;
