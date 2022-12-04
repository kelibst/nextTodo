import React from "react";

const AddTodo = ({ submitTask, value, handleInputChange }) => {
  return (
    <form onSubmit={submitTask}>
      <input
        type="text"
        placeholder="Enter your task here"
        value={value}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default AddTodo;
