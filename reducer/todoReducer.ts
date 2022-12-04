import taskInterface from "../interfaces/taskInterfaces";
import { v4 as uuidv4 } from "uuid";

const todoReducer = (
  state: taskInterface[],
  action: {
    type: string;
    payload: {
      todo: taskInterface;
    };
  }
) => {
  switch (action.type) {
    case "COMPLETE_TASK":
      return state.map((todo) => {
        if (todo.id === action.payload.todo.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });

    case "INCOMPLETE_TASK":
      return state.map((todo) => {
        if (todo.id === action.payload.todo.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });

    case "ADD_TODO":
      return [...state, action.payload.todo];
    default:
      throw new Error("Sorry failed to pass state");
  }
};

export default todoReducer;
