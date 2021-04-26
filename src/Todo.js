import React from "react";
import "./myStyles.css";

export default function Todo({ exactTodo, toggleTodo }) {
  function hadleTodoClick() {
    toggleTodo(exactTodo.id);
  }

  return (
    <div className="item">
      <label>
        <input
          type="checkbox"
          className="confirmation"
          checked={exactTodo.complete}
          onChange={hadleTodoClick}
        ></input>
        {exactTodo.name}
      </label>
    </div>
  );
}
