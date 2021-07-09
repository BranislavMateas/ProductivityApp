import React from "react";
import "./myStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
} from "@fortawesome/fontawesome-free-solid";

export default function Todo({
    exactTodo,
    toggleTodo,
    handleCompleteTodos,
    todos,
    orderChange,
}) {
    function remainingDays() {}

    function handleOrderHigher() {
        var position = todos.indexOf(exactTodo);
        var higher = todos[position - 1];

        if (position - 1 < 0) {
            return alert("You're killing it!");
        }

        todos.splice(position - 1, 2, exactTodo, higher);
        orderChange(todos);
    }

    function handleOrderLower() {
        var position = todos.indexOf(exactTodo);
        var lower = todos[position + 1];

        if (position + 1 >= todos.length) {
            return alert("You can't go lower, can you? :)");
        }

        todos.splice(position, 2, lower, exactTodo);
        orderChange(todos);
    }

    function hadleTodoClick() {
        toggleTodo(exactTodo.id);
        handleCompleteTodos();
    }

    return (
        <>
            <div className="task">
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
                <div className="sorting">
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        onClick={handleOrderHigher}
                    />
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        onClick={handleOrderLower}
                    />
                </div>
            </div>
        </>
    );
}
