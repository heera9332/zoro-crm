import { StateCreator } from "zustand";
import { Project } from "@/payload-types";
import { axios } from "@/lib/axios";

interface ProjectQuery {
  limit?: number;
  page?: number;
  q?: string;
}

export interface ProjectSlice {
  projects: Project[];
  loadingProjects: boolean;
  projectsPagination: any;
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  loadProjects: (query?: ProjectQuery) => Promise<void>;
}

export const createProjectSlice: StateCreator<
  ProjectSlice,
  [],
  [],
  ProjectSlice
> = (set) => ({
  projects: [],
  loadingProjects: false,
  projectsPagination: null,

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((pr) =>
        pr.id === id ? { ...pr, ...data } : pr
      ),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((pr) => pr.id !== id),
    })),

  loadProjects: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingProjects: true });
    try {
      const res = await axios.get(
        `/api/projects?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(q)}`
      );
      const data = res.data;
      set({
        projects: data.docs,
        projectsPagination: {
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
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      set({ loadingProjects: false });
    }
  },
});
