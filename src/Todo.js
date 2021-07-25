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
    day,
}) {
    function daySwitcher() {
        console.log(day);
        let den;
        switch (day) {
            case 0:
                den = "Ne";
                break;
            case 1:
                den = "Po";
                break;
            case 2:
                den = "Ut";
                break;
            case 3:
                den = "St";
                break;
            case 4:
                den = "Št";
                break;
            case 5:
                den = "Pi";
                break;
            case 6:
                den = "So";
                break;

            case 69:
                den = "";
                break;

            default:
                break;
        }

        return den;
    }

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

    function remainingDays() {
        if (exactTodo.remaining < 0) {
            return "Zameškaných dní: " + Math.abs(exactTodo.remaining);
        } else if (exactTodo.remaining > 0) {
            return "Ostávajúcich dní: " + exactTodo.remaining;
        } else {
            return "Dneska deadline!";
        }
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
                        {exactTodo.dateYes === true && (
                            <h5>
                                {daySwitcher()} {exactTodo.date} |{" "}
                                {remainingDays()}
                            </h5>
                        )}
                        <h4>{exactTodo.descr}</h4>
                    </div>
                </div>
                <div className="sorting">
                    <FontAwesomeIcon
                        id="up"
                        icon={faChevronUp}
                        onClick={handleOrderHigher}
                    />
                    <FontAwesomeIcon
                        id="down"
                        icon={faChevronDown}
                        onClick={handleOrderLower}
                    />
                </div>
            </div>
        </>
    );
}
