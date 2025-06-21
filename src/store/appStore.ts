import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ProjectSlice,
  createProjectSlice,
  createTaskSlice,
  TaskSlice,
  createNotesSlice,
  NotesSlice,
} from "@/store/slices/index";

type AppState = ProjectSlice & TaskSlice & NotesSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createProjectSlice(...a),
      ...createTaskSlice(...a),
      ...createNotesSlice(...a),
    }),
    { name: "zoro-crm-storage" }
  )
);
