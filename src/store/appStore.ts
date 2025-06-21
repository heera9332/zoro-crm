import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProjectSlice, createProjectSlice, createTaskSlice, TaskSlice } from "@/store/slices/index";

type AppState = ProjectSlice & TaskSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createProjectSlice(...a),
      ...createTaskSlice(...a),
    }),
    { name: "zoro-crm-storage" }
  )
);
