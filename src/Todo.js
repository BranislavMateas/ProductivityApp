import React from "react";
import "./myStyles.css";

export default function Todo({ exactTodo, toggleTodo, handleCompleteTodos }) {
  function hadleTodoClick() {
    toggleTodo(exactTodo.id);
    handleCompleteTodos()
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
