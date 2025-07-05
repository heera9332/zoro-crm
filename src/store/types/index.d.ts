export interface NotesSlice {
  notes: Note[];
  loadingNotes: boolean;
  notesPagination: any;
  currentNote: Note | null;

  getNotes: (query?: { limit?: number; page?: number; q?: string }) => Promise<void>;
  getNote: (id: string) => Promise<Note | null>;
  addNote: (note: Note) => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  removeNote: (id: string) => void;
}

export interface NotificationSlice {
  notifications: Notification[];
  loadingNotifications: boolean;
  notificationsPagination: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  } | null;
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, data: Partial<Notification>) => void;
  removeNotification: (id: string) => void;
  loadNotifications: (query?: NotificationQuery) => Promise<void>;
}