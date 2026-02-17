import type { NoteFormData } from "../utils/types";
import axiosInstance from "./apiClient";

export const notesAPI = {
  getAllNotes: async () => {
    const response = await axiosInstance.get('/notes');
    return response.data;
  },

  getNoteById: async (id: string) => {
    const response = await axiosInstance.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (data: NoteFormData) => {
    const response = await axiosInstance.post('/notes', data);
    return response.data;
  },

  updateNote: async (id: string, data: Partial<NoteFormData>) => {
    const response = await axiosInstance.put(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await axiosInstance.delete(`/notes/${id}`);
    return response.data;
  },

  searchNotes: async (query: string) => {
    const response = await axiosInstance.get(`/notes/search?q=${query}`);
    return response.data;
  },
};