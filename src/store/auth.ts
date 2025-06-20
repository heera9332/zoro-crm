import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// Types
export interface AuthUser {
  id?: string;
  email: string;
  username: string;
  name?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  login: (params: { username: string; password: string }) => Promise<boolean>;
  register: (params: {
    email: string;
    password: string;
    username: string;
    name?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async ({ username, password }) => {
        set({ loading: true, error: null });
        try {
          const { data } = await axios.post("/api/users/login", {
            username,
            password,
          });
          if (!data.token) {
            set({
              error:
                data.errors?.[0]?.message || data.message || "Login failed",
              loading: false,
            });
            return false;
          }
          set({
            user: data.user,
            token: data.token,
            loading: false,
            error: null,
          });
          return true;
        } catch (err: any) {
          set({
            error:
              err.response?.data?.errors?.[0]?.message ||
              err.response?.data?.message ||
              err.message ||
              "Network error",
            loading: false,
          });
          return false;
        }
      },

      register: async ({ email, password, username, name }) => {
        set({ loading: true, error: null });
        try {
          const { data } = await axios.post("/api/users/register", {
            email,
            password,
            username,
            name,
          });
          if (data.errors) {
            set({
              error:
                data.errors?.[0]?.message ||
                data.message ||
                "Registration failed",
              loading: false,
            });
            return false;
          }
          set({ loading: false, error: null });
          return true;
        } catch (err: any) {
          set({
            error:
              err.response?.data?.errors?.[0]?.message ||
              err.response?.data?.message ||
              err.message ||
              "Network error",
            loading: false,
          });
          return false;
        }
      },

      forgotPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
          await axios.post("/api/users/forgot-password", { email });
          set({ loading: false, error: null });
          return true;
        } catch (err: any) {
          set({
            error:
              err.response?.data?.errors?.[0]?.message ||
              err.response?.data?.message ||
              err.message ||
              "Network error",
            loading: false,
          });
          return false;
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ loading: true, error: null });
        try {
          await axios.post("/api/users/reset-password", { token, password });
          set({ loading: false, error: null });
          return true;
        } catch (err: any) {
          set({
            error:
              err.response?.data?.errors?.[0]?.message ||
              err.response?.data?.message ||
              err.message ||
              "Network error",
            loading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },
    }),
    {
      name: "zoro-crm-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
