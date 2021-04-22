import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid';
import "./myStyles.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"
var adderer = document.getElementById("adder")


function App() {
  const [todosList, setTodos] = useState([]); // useState vracia array(2) - object destructuring - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
  const todoContains = useRef()

  useEffect(() => { // make todos load from local storage
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => { // make todos saved from local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosList))
  }, [todosList])

  function toggleTodo(id){
    const newTodos = [...todosList]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const todoName = todoContains.current.value;
    if (todoName === "") return ;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: todoName, complete: false}]
    })
    todoContains.current.value = null;
  }

  function handleCompleteTodos(){
    const uncompleted = todosList.filter(exactTodo => !exactTodo.complete)
    setTodos(uncompleted)
  }
  

  return (
    <>
      <div className="blok">
        <TodoList todos={todosList} toggleTodo={toggleTodo} /> 
        <div className="bottomThings">
          <input className="bar" onKeyPress={(e) => e.key === 'Enter' && adderer.click()} ref={todoContains} type="text"></input>
          <button id="adder" onClick={handleAddTodo}>Add todo</button>
        </div>
        <button onClick={handleCompleteTodos}>Clear completed to do-s</button>
        <div>{todosList.filter(exactTodo => !exactTodo.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
