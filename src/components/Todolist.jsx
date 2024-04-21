import React, { useEffect } from "react";

import "../sass/todo.scss";
import Todoadd from "./Todoadd";
import TodoZustand from "../app/todos/todoZustand";

function Todolist() {
  const { todos, fetchTodos,toggleTodo,deleteTodo } = TodoZustand();

  useEffect(() => {
    fetchTodos();
  }, []);
const todoLenght = todos.length

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container">
      <div></div>
      <div className="todos">
        <h1>Todos ({todoLenght})</h1>
        <Todoadd />
        {/* {loading && <h1>Loading....</h1>}
        {error && <h1>Error...</h1>} */}
        {todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={todo.completed ? "true" : "falce"}
                >
                  {todo.title}
                </span>{" "}
                <div>
                  <span className="complated">
                    {todo.completed ? "✅" : "❌"}
                  </span>
                  <button onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todolist;
