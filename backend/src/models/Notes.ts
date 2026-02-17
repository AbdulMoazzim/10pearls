import mongoose, { Schema } from 'mongoose';
import { INote } from '../types/types';

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [255, 'Title cannot exceed 255 characters'],
    },
    content: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
noteSchema.index({ userId: 1, isDeleted: 1, updatedAt: -1 });
noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;