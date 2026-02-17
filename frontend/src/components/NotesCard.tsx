// src/components/notes/NoteCard.tsx
import React from 'react';
import { FiEdit, FiTrash2, FiClock } from 'react-icons/fi';
import type { Note } from '../utils/types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const truncateContent = (content: string): string => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={() => onEdit(note)}
      className="bg-white  rounded-2xl shadow-md hover:shadow-xl border border-gray-200 cursor-pointer hover:-translate-y-1 transition-all duration-200 group"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900  truncate flex-1">
            {note.title}
          </h3>
          <div className="flex gap-2 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              aria-label="Edit note"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note._id);
              }}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete note"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        <p className="text-gray-600  text-sm line-clamp-3">
          {truncateContent(note.content)}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 ">
          <FiClock size={14} />
          <span>{formatDate(note.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};