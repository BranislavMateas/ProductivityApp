import React, { useState } from "react";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]); // useState vracia array(2) - jedna polozka aktuálny stav, druhá bude pre funkciu, ktorá tento stav updatuje
  return (
    <>
      <TodoList />
      <input type="text"></input>
      <button>Add todo</button>
      <button>Clear completed to do-s</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
