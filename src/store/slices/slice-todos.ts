import { StateCreator } from "zustand";
import { Todo } from "@/payload-types";
import { axios } from "@/lib/axios";

export interface TodosSlice {
  todos: Todo[];
  loadingTodos: boolean;
  todosPagination: any;

  getTodos: (query?: { limit?: number; page?: number; q?: string }) => Promise<void>;
  getTodo: (id: string) => Promise<Todo | null>;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, data: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
}

export const createTodosSlice: StateCreator<
  TodosSlice,
  [],
  [],
  TodosSlice
> = (set, get) => ({
  todos: [],
  loadingTodos: false,
  todosPagination: null,

  getTodos: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingTodos: true });
    try {
      const res = await axios.get(
        `/api/todos?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(q)}`
      );
      const data = res.data;
      set({
        todos: data.docs,
        todosPagination: {
          totalDocs: data.totalDocs,
          limit: data.limit,
          totalPages: data.totalPages,
          page: data.page,
          pagingCounter: data.pagingCounter,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
        },
      });
    } catch (e) {
      console.error("Failed to load todos", e);
    } finally {
      set({ loadingTodos: false });
    }
  },

  getTodo: async (id: string) => {
    set({ loadingTodos: true });
    try {
      const res = await axios.get(`/api/todos/${id}`);
      const todo = res.data;
      // Optionally update/add in todos[]
      set((state) => ({
        todos: state.todos.some((t) => t.id === id)
          ? state.todos.map((t) => (t.id === id ? todo : t))
          : [...state.todos, todo],
      }));
      return todo;
    } catch (e) {
      console.error("Failed to load todo", e);
      return null;
    } finally {
      set({ loadingTodos: false });
    }
  },

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  updateTodo: (id, data) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
});
