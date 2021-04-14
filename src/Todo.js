import React from 'react'

export default function Todo({exactTodo}) {
    return (
        <div>
            <label>
                <input type="checkbox" checked="{exactTodo.complete}"></input>
                {exactTodo.name}
            </label>
        </div>
    )
}
