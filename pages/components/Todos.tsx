import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <div>
      <ul>
        {todos.length ? (
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>{todo.task}</label>
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
