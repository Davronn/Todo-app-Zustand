import { create } from "zustand";
import axios from "axios";

const TodoZustand = create((set) => ({
  loading: false,
  todos: [],
  error: null,
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:3000/todos");
      set({ todos: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  toggleTodo: async (id) => {
    try {
      const { data: todos } = await axios.get("http://localhost:3000/todos"); 
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) {
        throw new Error("Todo not found");
      }
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.patch(`http://localhost:3000/todos/${id}`, updatedTodo);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  },
  addTodo: async (todoData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todos",
        todoData
      );
      set((state) => ({
        todos: [...state.todos, response.data],
      }));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  },
  deleteTodo: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },
}));

export default TodoZustand;
