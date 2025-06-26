import { BsPinAngle, BsPinFill } from 'react-icons/bs';
import type { Note } from '../utils/storage';
import { MdClose } from 'react-icons/md';

interface NoteCardProps {
  note: Note;
  isDeleting?: boolean;
  onEditClick: (note: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
}

const NoteCard = ({
  note,
  isDeleting,
  onEditClick,
  onDelete,
  onTogglePin,
}: NoteCardProps) => {
  return (
    <>
      <div
        className={`bg-gray-800/30 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-lg p-4 flex flex-col cursor-pointer transition-transform duration-300 ${
          isDeleting ? 'scale-out' : 'scale-in'
        }`}
        onClick={() => onEditClick(note)}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
          >
            {note.isPinned ? (
              <BsPinFill className="h-5 w-5 text-yellow-500 hover:text-gray-500 cursor-pointer" />
            ) : (
              <BsPinAngle className="h-5 w-5 text-gray-500 hover:text-yellow-500 cursor-pointer" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            <MdClose className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" />
          </button>
        </div>
        <h3 className="font-bold text-lg">
          {note.title || 'Untitled'}
        </h3>
        <p className="mt-2 text-sm line-clamp-3">
          {note.content || '...'}
        </p>
      </div>
    </>
  );
};

export default NoteCard;
