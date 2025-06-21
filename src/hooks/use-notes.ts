import { useAppStore } from "@/store/appStore";

export function useNotes() {
  const notes = useAppStore((s) => s.notes);
  const currentNote = useAppStore((s) => s.currentNote);
  const loadingNotes = useAppStore((s) => s.loadingNotes);
  const notesPagination = useAppStore((s) => s.notesPagination);

  const getNotes = useAppStore((s) => s.getNotes);
  const getNote = useAppStore((s) => s.getNote);
  const addNote = useAppStore((s) => s.addNote);
  const updateNote = useAppStore((s) => s.updateNote);
  const removeNote = useAppStore((s) => s.removeNote);

  return {
    notes,
    currentNote,
    loadingNotes,
    notesPagination,
    getNotes,
    getNote,
    addNote,
    updateNote,
    removeNote,
  };
}
