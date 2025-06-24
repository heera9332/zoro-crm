import { StateCreator } from "zustand";
import { User } from "@/payload-types";
import { axios } from "@/lib/axios";

export interface UsersSlice {
  users: User[];
  loadingUsers: boolean;
  usersPagination: any;
  currentUser: User | null;

  getUsers: (query?: {
    limit?: number;
    page?: number;
    q?: string;
  }) => Promise<void>;
  getUser: (id: string) => Promise<User | null>;
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
}

export const createUsersSlice: StateCreator<UsersSlice, [], [], UsersSlice> = (
  set,
  get
) => ({
  users: [],
  loadingUsers: false,
  usersPagination: null,
  currentUser: null,

  getUsers: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingUsers: true });
    try {
      const res = await axios.get(
        `/api/users?limit=${limit}&page=${page}&where[username][contains]=${encodeURIComponent(q)}`
      );
      const data = res.data;
      set({
        users: data.docs,
        usersPagination: {
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
      console.error("Failed to load users", e);
    } finally {
      set({ loadingUsers: false });
    }
  },

  getUser: async (id: string) => {
    set({ loadingUsers: true });
    try {
      const res = await axios.get(`/api/users/${id}`);
      const user = res.data;
      set((state) => ({
        currentUser: user,
        users: state.users.some((u) => u.id === id)
          ? state.users.map((u) => (u.id === id ? user : u))
          : [...state.users, user],
      }));
      return user;
    } catch (e) {
      console.error("Failed to load user", e);
      return null;
    } finally {
      set({ loadingUsers: false });
    }
  },

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
      currentUser:
        state.currentUser && state.currentUser.id === id
          ? { ...state.currentUser, ...data }
          : state.currentUser,
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      currentUser:
        state.currentUser && state.currentUser.id === id
          ? null
          : state.currentUser,
    })),
});
