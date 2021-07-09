import React from "react";
import Todo from "./Todo";

export default function TodoList({
    todos,
    toggleTodo,
    handleCompleteTodos,
    orderChange,
}) {
    return todos.map((todo) => {
        return (
            <Todo
                key={todo.id}
                exactTodo={todo}
                todos={todos}
                toggleTodo={toggleTodo}
                handleCompleteTodos={handleCompleteTodos}
                orderChange={orderChange}
            />
        );
    });
}
