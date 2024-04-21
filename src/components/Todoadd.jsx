import React, { useEffect, useState } from "react";
import "../sass/add.scss";
import TodoZustand from "../app/todos/todoZustand";

function Todoadd() {
  const [inputValue, setInputValue] = useState("");
  const { todos, fetchTodos, toggleTodo, deleteTodo } = TodoZustand();

  const lenght = todos.length;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await TodoZustand.getState().addTodo({
      title: inputValue,
      completed: false,
    });
    // Optionally, trigger a re-fetch of todos to update the UI
    await TodoZustand.getState().fetchTodos();
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="btnadd" type="submit">
        Add Todo
      </button>
    </form>
  );
}

export default Todoadd;
