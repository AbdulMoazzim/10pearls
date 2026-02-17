// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiSearch,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import type { Note } from '../utils/types';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { NoteCard } from '../components/NotesCard';
import { NoteEditor } from '../components/NoteEditor';
import { notesAPI } from '../api/notsApi';

export const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getAllNotes();
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(noteId);
        setNotes(notes.filter((note) => note._id !== noteId));
        toast.success('Note deleted successfully');
      } catch {
        toast.error('Failed to delete note');
      }
    }
  };

  const handleSaveNote = async (noteData: { title: string; content: string }) => {
    try {
      if (selectedNote) {
        const response = await notesAPI.updateNote(selectedNote._id, noteData);
        setNotes(notes.map((note) => (note._id === selectedNote._id ? response.data : note)));
        toast.success('Note updated successfully');
      } else {
        const response = await notesAPI.createNote(noteData);
        setNotes([response.data, ...notes]);
        toast.success('Note created successfully');
      }
      setIsModalOpen(false);
    } catch {
      toast.error('Failed to save note');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };



  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Navbar */}
      <nav className="bg-white  border-b border-gray-200  sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NotesApp
            </h1>

            <div className="flex items-center gap-4">

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </div>
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white  rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-200 ">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700 "
                      >
                        <FiUser /> Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100  flex items-center gap-2 text-red-600 "
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 ">My Notes</h2>
              <p className="text-gray-600  mt-1">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>

            <Button variant="gradient" size="lg" onClick={handleCreateNote}>
              <FiPlus /> Create Note
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white  border border-gray-300  rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900"
            />
          </div>

          {/* Notes Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="xl" />
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100  rounded-full flex items-center justify-center">
                <FiPlus className="text-purple-600 " size={40} />
              </div>
              <p className="text-xl text-gray-500  mb-4">
                {searchQuery ? 'No notes found' : 'No notes yet'}
              </p>
              <p className="text-gray-400  mb-6">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'Create your first note to get started'}
              </p>
              {!searchQuery && (
                <Button variant="gradient" onClick={handleCreateNote}>
                  <FiPlus /> Create Your First Note
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Note Editor Modal */}
      <NoteEditor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={selectedNote}
        onSave={handleSaveNote}
      />
    </div>
  );
};