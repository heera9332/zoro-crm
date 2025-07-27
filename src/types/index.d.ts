export interface ObjectPagination {
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

import { StateCreator } from "zustand";
import { axios } from "@/lib/axios";
import { Chat, Message, PaginationMeta } from "../types";

interface MessageQuery {
  chatId: string;
  limit?: number;
  page?: number;
}

export interface ChatSlice {
  chats: Chat[];
  messages: Record<string, Message[]>; // keyed by chatId
  loadingMessages: boolean;
  messagesPagination: Record<string, PaginationMeta | null>;

  addChat: (chat: Chat) => void;
  loadMessages: (query: MessageQuery) => Promise<void>;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, data: Partial<Message>) => void;
  removeMessage: (chatId: string, messageId: string) => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  chats: [],
  messages: {},
  loadingMessages: false,
  messagesPagination: {},

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats.filter((c) => c.id !== chat.id), chat],
    })),

  loadMessages: async ({ chatId, limit = 20, page = 1 }) => {
    set({ loadingMessages: true });
    try {
      const res = await axios.get(
        `/api/messages?limit=${limit}&page=${page}&where[chat][equals]=${chatId}`
      );
      const { docs, ...pagination } = res.data;
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: docs,
        },
        messagesPagination: {
          ...state.messagesPagination,
          [chatId]: pagination,
        },
      }));
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      set({ loadingMessages: false });
    }
  },

  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),

  updateMessage: (chatId, messageId, data) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).map((m) =>
          m.id === messageId ? { ...m, ...data } : m
        ),
      },
    })),

  removeMessage: (chatId, messageId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).filter((m) => m.id !== messageId),
      },
    })),
});
