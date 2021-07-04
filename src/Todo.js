import React from "react";
import "./myStyles.css";

export default function Todo({ exactTodo, toggleTodo, handleCompleteTodos }) {
  function remainingDays() {

  }
  
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
        <h4>{exactTodo.name}</h4>
        <h6>{exactTodo.descr}</h6>
        <p>Termín: {exactTodo.date}</p>
        <p>Zostavajúci čas: {remainingDays}</p>
      </label>
    </div>
  );
}
