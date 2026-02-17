import Note from "../models/Notes";
import { NoteData } from "../types/types";
import { HttpError } from "../utils/error";
import logger from "../utils/logger";


class NoteService {
  // Get all notes for a user
  async getAllNotes(userId: string) {
    const notes = await Note.find({
      userId,
      isDeleted: false,
    }).sort({ updatedAt: -1 });

    logger.info(`Retrieved ${notes.length} notes for user: ${userId}`);

    return notes;
  }

  // Get single note
  async getNoteById(noteId: string, userId: string) {
    const note = await Note.findOne({
      _id: noteId,
      userId,
      isDeleted: false,
    });

    if (!note) {
      throw new HttpError(404, 'Note not found');
    }

    return note;
  }

  // Create new note
  async createNote(userId: string, data: NoteData) {
    const note = await Note.create({
      userId,
      title: data.title,
      content: data.content,
    });

    logger.info(`Note created: ${note._id} by user: ${userId}`);

    return note;
  }

  // Update note
  async updateNote(noteId: string, userId: string, data: Partial<NoteData>) {
    const note = await Note.findOne({
      _id: noteId,
      userId,
      isDeleted: false,
    });

    if (!note) {
      throw new HttpError(404, 'Note not found');
    }

    // Update fields
    if (data.title !== undefined) note.title = data.title;
    if (data.content !== undefined) note.content = data.content;

    await note.save();

    logger.info(`Note updated: ${note._id} by user: ${userId}`);

    return note;
  }

  // Delete note (soft delete)
  async deleteNote(noteId: string, userId: string) {
    console
    const note = await Note.findOne({
      _id: noteId,
      userId,
      isDeleted: false,
    });

    if (!note) {
      throw new HttpError(404, 'Note not found');
    }

    note.isDeleted = true;
    await note.save();

    logger.info(`Note deleted: ${note._id} by user: ${userId}`);

    return { message: 'Note deleted successfully' };
  }

  // Search notes
  async searchNotes(userId: string, query: string) {
    const notes = await Note.find({
      userId,
      isDeleted: false,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).sort({ updatedAt: -1 });

    logger.info(`Search for "${query}" returned ${notes.length} notes for user: ${userId}`);

    return notes;
  }
}

export default new NoteService();