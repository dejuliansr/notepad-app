import { BsPinAngle, BsPinFill } from 'react-icons/bs';
import type { Note } from '../utils/storage';
import { MdClose } from 'react-icons/md';

interface NoteCardProps {
  note: Note;
  onEdit: (n: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
}

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onTogglePin,
}: NoteCardProps) => {
  return (
    <>
      <div className="p-4 rounded-xl shadow-lg backdrop-blur-sm bg-black/30 border border-white/10 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => onTogglePin(note.id)}>
            {note.isPinned ? (
              <BsPinFill className="text-yellow-500" />
            ) : (
              <BsPinAngle className="text-gray-500" />
            )}
          </button>

          <button onClick={() => onDelete(note.id)}>
            <MdClose className="text-red-500" />
          </button>
        </div>
        <input
          type="text"
          value={note.title}
          onChange={(e) =>
            onEdit({ ...note, title: e.target.value })
          }
          placeholder="Title"
          className="bg-transparent font-bold text-lg w-full outline-none"
        />
        <textarea
          value={note.content}
          onChange={(e) =>
            onEdit({ ...note, content: e.target.value })
          }
          placeholder="Note..."
          className="bg-transparent mt-2 w-full h-24 outline-none resize-none"
        />
      </div>
    </>
  );
};

export default NoteCard;
