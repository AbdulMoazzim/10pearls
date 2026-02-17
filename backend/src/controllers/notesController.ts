import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import notesService from "../services/notesService";
import { AuthRequest } from "../types/types";

class NoteController {
  getAllNotes = asyncHandler(async (req: AuthRequest, res: Response) => {
    const notes = await notesService.getAllNotes(req.user!.id);

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  });

  getNoteById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const note = await notesService.getNoteById(
      req.params.id as string || "",
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      data: note,
    });
  });

  createNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const note = await notesService.createNote(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  });

  updateNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const note = await notesService.updateNote(
      req.params.id as string || "",
      req.user!.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  });

  deleteNote = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await notesService.deleteNote(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  });

  searchNotes = asyncHandler(async (req: AuthRequest, res: Response) => {
    const query = req.query.q as string;
    const notes = await notesService.searchNotes(req.user!.id, query);

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  });
}

export default new NoteController();
