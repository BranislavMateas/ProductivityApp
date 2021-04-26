import React from "react";
import Todo from "./Todo"

export default function TodoList({todos, toggleTodo, handleCompleteTodos}) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} exactTodo={todo} toggleTodo={toggleTodo} handleCompleteTodos={handleCompleteTodos} />
    })
  );
}
