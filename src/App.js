import React, { useState, useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todosList, setTodos] = useState([]); // useState vracia array(2) - object destructuring - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
  const todoContains = useRef()

  function handleAddTodo(e){
    const todoName = todoContains.current.value;
    if (todoName === "") return ;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: todoName, complete: true}]
    })
    todoContains.current.value = null;
  }

  return (
    <>
      <TodoList todos={todosList} /> 
      <input ref={todoContains} type="text"></input>
      <button onClick={handleAddTodo}>Add todo</button>
      <button>Clear completed to do-s</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
