import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./myStyles.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  // date process
  var initialDate = new Date()
  var currDay = initialDate.getDay()

  switch (currDay){
    case 0:
      currDay = "Nedeľa"
      break;
    case 1:
      currDay = "Pondelok"
      break;
    case 2:
      currDay = "Utorok"
      break;
    case 3:
      currDay = "Streda"
      break;
    case 4:
      currDay = "Štvrtok"
      break;
    case 5:
      currDay = "Piatok"
      break;  
    case 6:
      currDay = "Sobota"
      break;
    
    default:
      break;
  }

  var currDate = currDay + ", " + initialDate.getDate() + "." + (initialDate.getMonth()+1) + "." + initialDate.getFullYear()

  const [todosList, setTodos] = useState([]); // useState vracia array(2) - object destructuring - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
  const todoContains = useRef();

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
    if (todoName === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: todoName, complete: false }];
    });
    todoContains.current.value = null;
  }

  function handleCompleteTodos(e) {
    window.confirm("Are u sure?");
    setTodos(() => {
      return todosList.filter((exactTodo) => !exactTodo.complete)
    });
  }
  
  var adderer = document.getElementById("adder");
  
  //format poctu taskov
  switch(todosList.filter((exactTodo) => !exactTodo.complete).length) {
    case 1:
      var tasky="task";
      break;
    case 2:
      tasky="tasky";
      break;
    case 3:
      tasky="tasky";
      break;
    case 4:
      tasky="tasky";
      break;
    default:
      tasky="taskov"
      break;
  }

  return (
     <>
      <div className="blok">

        <h1 id="date">{currDate}</h1>
        <h3 id="remaining">Ostáva: {todosList.filter((exactTodo) => !exactTodo.complete).length} {tasky}</h3>
        <TodoList todos={todosList} toggleTodo={toggleTodo} handleCompleteTodos={handleCompleteTodos} />
        <input className="bar" onKeyPress={(e) => e.key === "Enter" && adderer.click()} ref={todoContains} type="text"></input>
        <button id="adder" onClick={handleAddTodo}>Add todo</button>
         
      </div>   
    </>
  );
}

export default App;
