import React, { useReducer } from "react";
import buttonReducer from "../../reducer/buttonReducer";

const FilterButtons = ({ dispatch }) => {
  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatch({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: "SHOW_INCOMPLETE" });
  };
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
    </div>
  );
};

export default FilterButtons;
