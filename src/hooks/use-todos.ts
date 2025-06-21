import { useAppStore } from "@/store/appStore";

export function useTodos() {
  const todos = useAppStore((s) => s.todos);
  const loadingTodos = useAppStore((s) => s.loadingTodos);
  const todosPagination = useAppStore((s) => s.todosPagination);

  const getTodos = useAppStore((s) => s.getTodos);
  const getTodo = useAppStore((s) => s.getTodo);
  const addTodo = useAppStore((s) => s.addTodo);
  const updateTodo = useAppStore((s) => s.updateTodo);
  const removeTodo = useAppStore((s) => s.removeTodo);

  return {
    todos,
    loadingTodos,
    todosPagination,
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    removeTodo,
  };
}
