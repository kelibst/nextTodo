import React from "react";
interface propsInterface {
  submitTask: React.FormEventHandler<HTMLFormElement>;
  value: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}
const AddTodo = (props: propsInterface) => {
  const { submitTask, value, handleInputChange } = props;
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
