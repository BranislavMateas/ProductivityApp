/* IMPORTS */
// IMPORT "REACT THINGS"
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-date-picker";
// IMPORT OTHER REACT COMPONENTS
import TodoList from "./TodoList";
//IMPORT CSS
import "./myStyles.css";

/* APP */
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
    // date picker
    const [value, onChange] = useState(new Date());

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

    function handleAddTodo(e) {
        const todoName = todoContains.current.value;
        const todoDescr = todoContainsDes.current.value;

        if (todoName === "")
            return alert("Sorry, ale v tvojom TODO tasku ti chýba obsah!");
        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                {
                    id: uuidv4(),
                    name: todoName,
                    complete: false,
                    descr: todoDescr,
                },
            ];
        });
        todoContains.current.value = null;
        todoContainsDes.current.value = null;
    }

    function orderChange(newOrder) {
        setTodos(() => {
            return [...newOrder];
        });
    }

    function handleCompleteTodos(e) {
        setTodos(() => {
            return todosList.filter((exactTodo) => !exactTodo.complete);
        });
    }

    var adderer = document.getElementById("adder");
    //format poctu taskov
    switch (todosList.filter((exactTodo) => !exactTodo.complete).length) {
        case 1:
            var tasky = "task";
            break;
        case 2:
            tasky = "tasky";
            break;
        case 3:
            tasky = "tasky";
            break;
        case 4:
            tasky = "tasky";
            break;
        default:
            tasky = "taskov";
            break;
    }

    return (
        <>
            <div className="blok">
                <h1 id="date">{currDate}</h1>
                <h2 id="remaining">
                    Ostáva:{" "}
                    {
                        todosList.filter((exactTodo) => !exactTodo.complete)
                            .length
                    }{" "}
                    {tasky}
                </h2>
                <ul className="list">
                    <TodoList
                        todos={todosList}
                        toggleTodo={toggleTodo}
                        handleCompleteTodos={handleCompleteTodos}
                        orderChange={orderChange}
                    />
                </ul>
                <input
                    className="bar"
                    onKeyPress={(e) => e.key === "Enter" && adderer.click()}
                    ref={todoContains}
                    type="text"
                ></input>
                <input
                    className="bar"
                    onKeyPress={(e) => e.key === "Enter" && adderer.click()}
                    ref={todoContainsDes}
                    type="text"
                ></input>
                <div id="adder" onClick={handleAddTodo}>
                    <a>
                        <h2>Pridaj To-Do</h2>
                    </a>
                </div>
                <DatePicker
                    className="piker"
                    onChange={onChange}
                    value={value}
                />
                <h1>{value.getDate()}</h1>
            </div>
        </>
    );
}

// EXPORT APP FUNCTION
export default App;
