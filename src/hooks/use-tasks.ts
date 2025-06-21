import { useAppStore } from "@/store/appStore";
import { Task } from "@/payload-types";

export function useTasks() {
  const tasks = useAppStore((s) => s.tasks);
  const loadingTasks = useAppStore((s) => s.loadingTasks);
  const tasksPagination = useAppStore((s) => s.tasksPagination);

  const addTask = useAppStore((s) => s.addTask);
  const updateTask = useAppStore((s) => s.updateTask);
  const removeTask = useAppStore((s) => s.removeTask);
  const loadTasks = useAppStore((s) => s.loadTasks);

  return {
    tasks,
    loadingTasks,
    tasksPagination,
    addTask,
    updateTask,
    removeTask,
    loadTasks,
  };
}
