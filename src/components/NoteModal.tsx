import { useEffect, useState } from 'react';
import type { Note } from '../utils/storage';

interface NoteModalProps {
  mode: 'add' | 'edit';
  note?: Note;
  onSave: (note: Note) => void;
  onClose: () => void;
  isClosing: boolean;
}

const NoteModal = ({
  mode,
  note,
  onSave,
  onClose,
  isClosing,
}: NoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      const updatedNote: Note = {
        ...note!,
        title,
        content,
      };
      onSave(
        mode === 'add'
          ? {
              ...updatedNote,
              id: Date.now(),
              isPinned: false,
            }
          : updatedNote
      );
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div
          className={`bg-gray-800 p-6 rounded-lg w-full h-2/4 max-w-lg shadow-lg transition-transform duration-300 ${
            isClosing ? 'scale-out' : 'scale-in'
          }`}
        >
          <h2 className="text-lg font-bold mb-4 text-white">
            {mode === 'add'
              ? 'Tambah Catatan'
              : 'Edit Catatan'}
          </h2>
          <input
            type="text"
            placeholder="Judul"
            className="w-full p-2 mb-3 rounded border border-gray-300 bg-gray-700 text-white border-none outline-none focus:outline-none focus:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Isi catatan"
            className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-700 text-white resize-none h-52 border-none outline-none focus:outline-none focus:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
