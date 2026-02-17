// src/components/notes/NoteEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  FiX,
  FiSave,
  FiBold,
  FiItalic,
  FiList,
  FiUnderline,
  FiCode,
  FiAlignLeft,
  FiMinus,
} from 'react-icons/fi';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import type { Note } from '../utils/types';

interface NoteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onSave: (noteData: { title: string; content: string }) => void;
}

// Toolbar Button Component
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  title,
  children,
  disabled = false,
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent editor from losing focus
    e.preventDefault();
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onMouseDown={handleMouseDown}
      title={title}
      disabled={disabled}
      className={`
        p-2 px-3 rounded-lg text-sm font-semibold transition-all duration-150
        flex items-center gap-1 select-none
        ${isActive
          ? 'bg-purple-600 text-white shadow-sm'
          : 'bg-gray-100  hover:bg-purple-100 text-gray-700 hover:text-purple-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
};

// Toolbar Separator
const ToolbarSeparator: React.FC = () => (
  <div className="w-px h-6 bg-gray-300  mx-1 self-center" />
);

// Toolbar Component
interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="px-4 py-2 border-b border-gray-200 flex flex-wrap items-center gap-1 bg-gray-50">
      {/* Text Style */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <FiBold size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <FiItalic size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <FiUnderline size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Inline Code"
      >
        <FiCode size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <span className="font-bold text-base leading-none">H1</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <span className="font-bold text-sm leading-none">H2</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <span className="font-bold text-xs leading-none">H3</span>
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <FiList size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <span className="text-xs font-bold">1.</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <FiAlignLeft size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <span className="text-xs font-mono font-bold">{`</>`}</span>
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Formatting Actions */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <FiMinus size={15} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        title="Clear Formatting"
      >
        <span className="text-xs font-bold">Clear</span>
      </ToolbarButton>

      {/* Undo/Redo */}
      <ToolbarSeparator />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <span className="text-xs font-bold">↩</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <span className="text-xs font-bold">↪</span>
      </ToolbarButton>
    </div>
  );
};

// Main NoteEditor Component
export const NoteEditor: React.FC<NoteEditorProps> = ({
  isOpen,
  onClose,
  note,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your note...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    autofocus: false,
    editable: true,
    // Force re-render on every transaction so toolbar stays in sync
    onTransaction: () => {},
  });

  // Sync note data when note changes
  useEffect(() => {
    if (!editor) return;

    if (note) {
      setTitle(note.title);
      editor.commands.setContent(note.content || '');
    } else {
      setTitle('');
      editor.commands.setContent('');
    }
  }, [note, editor, isOpen]);

  // Focus editor when modal opens
  useEffect(() => {
    if (isOpen && editor) {
      setTimeout(() => {
        editor.commands.focus('end');
      }, 100);
    }
  }, [isOpen, editor]);

  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    const content = editor?.getHTML() || '<p></p>';

    try {
      await onSave({
        title: title.trim(),
        content,
      });
    } finally {
      setSaving(false);
    }
  }, [title, editor, onSave]);

  const handleClose = useCallback(() => {
    setTitle('');
    editor?.commands.setContent('');
    onClose();
  }, [editor, onClose]);

  // Keyboard shortcut to save (Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleSave, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="relative w-full max-w-4xl bg-white  rounded-2xl shadow-2xl flex flex-col"
          style={{ maxHeight: '90vh', height: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Title Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200  shrink-0">
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-2xl font-bold bg-transparent border-none outline-none text-gray-900  placeholder-gray-400 "
              autoFocus={false}
            />
            <button
              type="button"
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 shrink-0"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Toolbar */}
          <div className="shrink-0">
            <Toolbar editor={editor} />
          </div>

          {/* Editor Content */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 cursor-text"
            onClick={() => editor?.commands.focus()}
          >
            <EditorContent
              editor={editor}
              className="min-h-full"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200  flex items-center justify-between shrink-0 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-400 ">
              Ctrl+S to save • Esc to close
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FiSave size={15} />
                {saving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};