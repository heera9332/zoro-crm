import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ProjectSlice,
  createProjectSlice,
  createTaskSlice,
  TaskSlice,
  createNotesSlice,
  NotesSlice,
  createTodosSlice, TodosSlice
} from "@/store/slices/index";

type AppState = ProjectSlice & TaskSlice & NotesSlice & TodosSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createProjectSlice(...a),
      ...createTaskSlice(...a),
      ...createNotesSlice(...a),
      ...createTodosSlice(...a),
    }),
    { name: "zoro-crm-storage" }
  )
);
