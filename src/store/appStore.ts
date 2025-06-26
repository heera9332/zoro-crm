import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ProjectSlice,
  createProjectSlice,
  createTaskSlice,
  TaskSlice,
  createNotesSlice,
  NotesSlice,
  createTodosSlice,
  TodosSlice,
  createUsersSlice,
  UsersSlice,
  createNotificationSlice,
  NotificationSlice,
} from "@/store/slices/index";

type AppState = ProjectSlice & TaskSlice & NotesSlice & TodosSlice & UsersSlice & NotificationSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createProjectSlice(...a),
      ...createTaskSlice(...a),
      ...createNotesSlice(...a),
      ...createTodosSlice(...a),
      ...createUsersSlice(...a),
      ...createNotificationSlice(...a),
    }),
    { name: "zoro-crm-storage" }
  )
);
