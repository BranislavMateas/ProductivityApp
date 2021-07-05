import React from "react";
import "./myStyles.css";

export default function Todo({ exactTodo, toggleTodo, handleCompleteTodos }) {
    function remainingDays() {}

    function hadleTodoClick() {
        toggleTodo(exactTodo.id);
        handleCompleteTodos();
    }

    return (
        <div className="item">
            <div className="leftSide">
                <input
                    type="checkbox"
                    className="confirmation"
                    checked={exactTodo.complete}
                    onChange={hadleTodoClick}
                ></input>
            </div>

            <div className="rightSide">
                <h3>{exactTodo.name}</h3>
                <h5>
                    {exactTodo.date} | do {remainingDays}
                </h5>
                <h4>{exactTodo.descr}</h4>
            </div>
        </div>
    );
}
