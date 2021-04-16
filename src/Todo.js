import React from 'react'

export default function Todo({exactTodo, toggleTodo}) {
    function hadleTodoClick() {
        toggleTodo(exactTodo.id)
    }


    return (
        <div>
            <label>
                <input type="checkbox" checked={exactTodo.complete} onChange={hadleTodoClick}></input>
                {exactTodo.name}
            </label>
        </div>
    )
}
