import React, { useState } from "react";
import TodoList from "./TodoList";

function App() {
  const [todosList, setTodos] = useState(["Todo číslo 1", "Todo číslo 2"]); // useState vracia array(2) - object destructuring - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
  return (
    <>
      <TodoList todos={todosList} /> 
      <input type="text"></input>
      <button>Add todo</button>
      <button>Clear completed to do-s</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
