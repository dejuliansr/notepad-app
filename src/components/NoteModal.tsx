import { useEffect, useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
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
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
          ],
        },
      });

      if (note?.content) {
        quillInstance.current.root.innerHTML = note.content;
      }
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML =
          note.content || '';
      }
    } else {
      setTitle('');
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = '';
      }
    }
  }, [note]);

  const handleSave = () => {
    const htmlContent =
      quillInstance.current?.root.innerHTML || '';
    if (title.trim() || htmlContent.trim()) {
      const updatedNote: Note = {
        ...note!,
        title,
        content: htmlContent,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md px-4">
      <div
        className={`flex flex-col bg-gray-800/30 text-white border border-gray-700/40 backdrop-blur-md p-6 rounded-lg w-full max-w-6xl h-4/5 shadow-lg transition-transform duration-300 ${
          isClosing ? 'scale-out' : 'scale-in'
        }`}
      >
        <h2 className="text-lg font-bold mb-4">
          {mode === 'add' ? 'Add Note' : 'Edit Note'}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full h-12 p-2 mb-3 text-2xl sm:text-3xl md:text-4xl rounded border-none outline-none focus:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Quill Editor */}
        <div
          ref={editorRef}
          className="w-full p-3 mb-4 rounded text-white bg-gray-900/20 overflow-auto h-full border-none outline-none focus:outline-none focus:ring-0 scroll-container"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded hover:bg-white/30 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded hover:bg-white/30 transition cursor-pointer"
          >
            {mode === 'add' ? 'Add' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
