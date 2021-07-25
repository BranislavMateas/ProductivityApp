/* IMPORTS */
// IMPORT "REACT THINGS"
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-date-picker";
import Todo from "./Todo";
// IMPORT OTHER REACT COMPONENTS
import { TransitionGroup, CSSTransition } from "react-transition-group";
//IMPORT CSS
import "./myStyles.css";

/* APP */
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
    // date picker
    const [value, onChange] = useState(new Date());

    // date picker - checkbox
    const [checked, setChecked] = useState(false);
    const handleClick = () => {
        setChecked(!checked);
    };

    // date process
    var initialDate = new Date();
    var currDay = initialDate.getDay();

    switch (currDay) {
        case 0:
            currDay = "Nedeľa";
            break;
        case 1:
            currDay = "Pondelok";
            break;
        case 2:
            currDay = "Utorok";
            break;
        case 3:
            currDay = "Streda";
            break;
        case 4:
            currDay = "Štvrtok";
            break;
        case 5:
            currDay = "Piatok";
            break;
        case 6:
            currDay = "Sobota";
            break;

        default:
            break;
    }

    var currDate =
        currDay +
        ", " +
        initialDate.getDate() +
        "." +
        (initialDate.getMonth() + 1) +
        "." +
        initialDate.getFullYear();

    const [todosList, setTodos] = useState([]); // useState vracia array(2) - object destructuring - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
    const todoContains = useRef();
    const todoContainsDes = useRef();

    useEffect(() => {
        // make todos load from local storage
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    useEffect(() => {
        // make todos saved from local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosList));
    }, [todosList]);

    function toggleTodo(id) {
        const newTodos = [...todosList];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    function returnFullDate() {
        if (value.getDate() === null) {
            return "--.--.----";
        }
        return (
            value.getDate() +
            "." +
            (value.getMonth() + 1) +
            "." +
            value.getFullYear()
        );
    }

    function handleAddTodo(e) {
        const todoName = todoContains.current.value;
        const todoDescr = todoContainsDes.current.value;
        const wasChecked = checked;

        if (wasChecked === true) {
            if (value === null) {
                return alert("Sorry, ale musíš zvoliť konkrétny dátum!");
            }
        }

        if (todoName.replace(/\s+/g, "") === "") {
            todoContains.current.value = null;
            return alert(
                "Sorry, ale v tvojom TODO tasku ti chýba poriadny nadpis!"
            );
        }

        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                {
                    id: uuidv4(),
                    name: todoName,
                    complete: false,
                    descr: todoDescr,
                    dateYes: wasChecked,
                    date: returnFullDate(),
                    remaining:
                        Math.floor(
                            (new Date(value).getTime() - new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                        ) + 1,
                },
            ];
        });
        if (checked) setChecked(!checked);
        todoContains.current.value = null;
        todoContainsDes.current.value = null;
    }

    function orderChange(newOrder) {
        setTodos(() => {
            return [...newOrder];
        });
    }

    function getMeDay() {
        if (value === null) {
            return 69;
        }
        return value.getDay();
    }

    function handleCompleteTodos(e) {
        setTodos(() => {
            return todosList.filter((exactTodo) => !exactTodo.complete);
        });
    }

    var adderer = document.getElementById("adder");
    //format poctu taskov

    function remainingTasksMsg() {
        var hlaska = "";
        switch (todosList.filter((exactTodo) => !exactTodo.complete).length) {
            case 0:
                hlaska = "Neostal ti žiaden task. Well played! :)";
                break;
            case 1:
                hlaska = "Ostáva ti už len " + 1 + " task";
                break;
            case 2:
                hlaska = "Zostávajú ti ešte " + 2 + " tasky";
                break;
            case 3:
                hlaska = "Zostávajú ti ešte " + 3 + " tasky";
                break;
            case 4:
                hlaska = "Zostávajú ti ešte " + 4 + " tasky";
                break;
            default:
                let pocet = todosList.filter(
                    (exactTodo) => !exactTodo.complete
                ).length;
                hlaska = "Ostáva ti ešte " + pocet + " taskov";
                break;
        }

        return hlaska;
    }

    return (
        <>
            <div className="blok">
                <h1 id="date">{currDate}</h1>
                <h2 id="remaining">{remainingTasksMsg()}</h2>
                <TransitionGroup component="ul" className="list">
                    {todosList.map((todo) => (
                        <CSSTransition
                            key={todo.id}
                            timeout={300}
                            classNames="fade"
                        >
                            <Todo
                                key={todo.id}
                                exactTodo={todo}
                                todos={todosList}
                                toggleTodo={toggleTodo}
                                handleCompleteTodos={handleCompleteTodos}
                                orderChange={orderChange}
                                day={getMeDay()}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <div className="controls">
                    <div className="leftControls">
                        <h3>Názov:</h3>
                        <input
                            className="bar"
                            onKeyPress={(e) =>
                                e.key === "Enter" && adderer.click()
                            }
                            ref={todoContains}
                            type="text"
                        ></input>

                        <h3>Popis:</h3>
                        <input
                            className="bar"
                            onKeyPress={(e) =>
                                e.key === "Enter" && adderer.click()
                            }
                            ref={todoContainsDes}
                            type="text"
                        ></input>
                    </div>

                    <div className="rightControls">
                        <div
                            className="tillPart"
                            style={{
                                textDecoration: "2px line-through",
                            }}
                        >
                            <div className="datePicking">
                                <input
                                    type="checkbox"
                                    className="confirmation"
                                    checked={checked}
                                    onClick={handleClick}
                                ></input>
                                <h3
                                    id="tillText"
                                    style={{
                                        opacity: "0.7",
                                    }}
                                >
                                    Termín do:
                                </h3>
                            </div>
                            <DatePicker
                                style={{
                                    opacity: "0.5",
                                }}
                                className="piker"
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                        <div id="adder" onClick={handleAddTodo}>
                            <h2>Pridaj To-Do</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// EXPORT APP FUNCTION
export default App;
