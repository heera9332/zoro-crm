import { StateCreator } from "zustand";
import { Task } from "@/payload-types";
import { axios } from "@/lib/axios";
import { ObjectPagination } from "@/types/index";

export interface TaskSlice {
  tasks: Task[];
  loadingTasks: boolean;
  tasksPagination: ObjectPagination | null;

  addTask: (task: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  removeTask: (id: string) => void;
  loadTasks: (query?: { limit?: number; page?: number; q?: string }) => Promise<void>;
}

export const createTaskSlice: StateCreator<
  TaskSlice,
  [],
  [],
  TaskSlice
> = (set) => ({
  tasks: [],
  loadingTasks: false,
  tasksPagination: null,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  loadTasks: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingTasks: true });
    try {
      const res = await axios.get(
        `/api/tasks?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(q)}`
      );
      const data = res.data;
      set({
        tasks: data.docs,
        tasksPagination: {
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
      console.error("Failed to load tasks", e);
    } finally {
      set({ loadingTasks: false });
    }
  },
});
