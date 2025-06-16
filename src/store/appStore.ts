import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axios } from "@/lib/axios";

import {
  User,
  Workspace,
  Media,
  Category,
  Tag,
  Post,
  Note,
  Project,
  Task,
  Timeline,
  Comment,
  Todo,
} from "@/payload-types";

interface ObjectPagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ProjectQuery {
  limit?: number;
  page?: number;
  q?: string;
}

interface AppState {
  users: User[];
  workspaces: Workspace[];
  media: Media[];
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  
  todos: Todo[];
  loadingTodos: boolean;

  notes: Note[];
  loadingNotes: boolean;

  projects: Project[];
  tasks: Task[];
  timelines: Timeline[];
  comments: Comment[];
  loadingProjects: boolean;
  notesPagination: ObjectPagination | null;
  projectsPagination: ObjectPagination | null;

  // CRUD actions
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
  loadUsers: () => Promise<void>;

  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, data: Partial<Workspace>) => void;
  removeWorkspace: (id: string) => void;

  addMedia: (media: Media) => void;
  updateMedia: (id: string, data: Partial<Media>) => void;
  removeMedia: (id: string) => void;

  addCategory: (category: Category) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  removeCategory: (id: string) => void;

  addTag: (tag: Tag) => void;
  updateTag: (id: string, data: Partial<Tag>) => void;
  removeTag: (id: string) => void;

  addPost: (post: Post) => void;
  updatePost: (id: string, data: Partial<Post>) => void;
  removePost: (id: string) => void;

  getNotes: (query?: ProjectQuery) => Promise<void>;
  addNote: (note: Note) => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  removeNote: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  loadProjects: (query?: ProjectQuery) => Promise<void>;

  addTask: (task: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  removeTask: (id: string) => void;

  addTimeline: (timeline: Timeline) => void;
  updateTimeline: (id: string, data: Partial<Timeline>) => void;
  removeTimeline: (id: string) => void;

  addComment: (comment: Comment) => void;
  updateComment: (id: string, data: Partial<Comment>) => void;
  removeComment: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      users: [],
      workspaces: [],
      media: [],
      categories: [],
      tags: [],
      posts: [],
      notes: [],
      projects: [],
      tasks: [],
      timelines: [],
      comments: [],
      loadingNotes: false,

      loadingProjects: false,
      projectsPagination: null,
      notesPagination: null,

      // Users
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
        })),
      removeUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      loadUsers: async () => {
        try {
          const res = await axios.get("/api/users");
          const data: User[] = res.data.docs;
          set({ users: data });
        } catch (error) {
          console.error("Failed to load users:", error);
        }
      },

      // Workspaces
      addWorkspace: (workspace) =>
        set((state) => ({ workspaces: [...state.workspaces, workspace] })),
      updateWorkspace: (id, data) =>
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === id ? { ...w, ...data } : w
          ),
        })),
      removeWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== id),
        })),

      // Media
      addMedia: (media) => set((state) => ({ media: [...state.media, media] })),
      updateMedia: (id, data) =>
        set((state) => ({
          media: state.media.map((m) => (m.id === id ? { ...m, ...data } : m)),
        })),
      removeMedia: (id) =>
        set((state) => ({
          media: state.media.filter((m) => m.id !== id),
        })),

      // Categories
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, data) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      // Tags
      addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
      updateTag: (id, data) =>
        set((state) => ({
          tags: state.tags.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      removeTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((t) => t.id !== id),
        })),

      // Posts
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (id, data) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      removePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),

      // Notes
      getNotes: async ({ limit = 10, page = 1, q = "" } = {}) => {
        set({ loadingNotes: true });
        try {
          const res = await axios.get(
            `/api/notes?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(
              q ?? ""
            )}`
          );
          const data = res.data;
          set({
            notes: data.docs,
            notesPagination: {
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
          console.error("Failed to load projects", e);
        } finally {
          set({ loadingNotes: false });
        }
      },
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      updateNote: (id, data) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...data } : n)),
        })),
      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      // Projects
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
      loadProjects: async ({ limit = 10, page = 1, q = "" } = {}) => {
        set({ loadingProjects: true });
        try {
          const res = await axios.get(
            `/api/projects?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(
              q ?? ""
            )}`
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
        } catch (e) {
          console.error("Failed to load projects", e);
        } finally {
          set({ loadingProjects: false });
        }
      },

      // Tasks
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // Timelines
      addTimeline: (timeline) =>
        set((state) => ({ timelines: [...state.timelines, timeline] })),
      updateTimeline: (id, data) =>
        set((state) => ({
          timelines: state.timelines.map((tl) =>
            tl.id === id ? { ...tl, ...data } : tl
          ),
        })),
      removeTimeline: (id) =>
        set((state) => ({
          timelines: state.timelines.filter((tl) => tl.id !== id),
        })),

      // Comments
      addComment: (comment) =>
        set((state) => ({ comments: [...state.comments, comment] })),
      updateComment: (id, data) =>
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      removeComment: (id) =>
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "app-storage", // localStorage key
    }
  )
);
