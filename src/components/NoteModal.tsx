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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md px-4">
        <div
          className={`flex flex-col justify-between bg-gray-800/30 text-white border border-gray-700/40 backdrop-blur-md p-6 rounded-lg w-full max-w-6xl h-4/5 shadow-lg transition-transform duration-300 ${
            isClosing ? 'scale-out' : 'scale-in'
          }`}
        >
          <h2 className="text-lg font-bold mb-4 text-white">
            {mode === 'add' ? 'Add Note' : 'Edit Note'}
          </h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full h-12 p-2 mb-3 text-2xl sm:text-3xl md:text-4xl rounded border-none outline-none focus:outline-none focus:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content of the note"
            className="w-full p-2 mb-4 rounded text-white  resize-none h-full border-none outline-none focus:outline-none focus:ring-0 scroll-container"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-auto space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white rounded hover:bg-white/30 transition duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white rounded hover:bg-white/30 transition duration-300 cursor-pointer"
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
