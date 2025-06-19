import { useState } from 'react';

interface AddNoteModalProps {
  onAdd: (title: string, content: string) => void;
  onClose: () => void;
}

const AddNoteModal = ({
  onAdd,
  onClose,
}: AddNoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (title.trim() || content.trim()) {
      onAdd(title, content);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-white">
            Tambah Catatan
          </h2>
          <input
            type="text"
            placeholder="Judul"
            className="w-full p-2 mb-3 rounded border border-gray-300 bg-gray-700 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Isi catatan"
            className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-700 text-white resize-none h-24"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNoteModal;
