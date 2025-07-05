import { StateCreator } from "zustand";
import { axios } from "@/lib/axios";
import { NotesSlice } from "../types";

export const createNotesSlice: StateCreator<
  NotesSlice,
  [],
  [],
  NotesSlice
> = (set, get) => ({
  notes: [],
  loadingNotes: false,
  notesPagination: null,
  currentNote: null,

  getNotes: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingNotes: true });
    try {
      const res = await axios.get(
        `/api/notes?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(q)}`
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
      console.error("Failed to load notes", e);
    } finally {
      set({ loadingNotes: false });
    }
  },

  getNote: async (id: string) => {
    set({ loadingNotes: true });
    try {
      const res = await axios.get(`/api/notes/${id}`);
      const note = res.data;
      // Optionally: update or add this note in notes[]
      set((state) => ({
        currentNote: note,
        notes: state.notes.some((n) => n.id === id)
          ? state.notes.map((n) => (n.id === id ? note : n))
          : [...state.notes, note],
      }));
      return note;
    } catch (e) {
      console.error("Failed to load note", e);
      return null;
    } finally {
      set({ loadingNotes: false });
    }
  },

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  updateNote: (id, data) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...data } : n
      ),
      currentNote:
        state.currentNote && state.currentNote.id === id
          ? { ...state.currentNote, ...data }
          : state.currentNote,
    })),

  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      currentNote: state.currentNote && state.currentNote.id === id ? null : state.currentNote,
    })),
});
