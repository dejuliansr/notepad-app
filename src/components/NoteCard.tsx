import { BsPinAngle, BsPinFill } from 'react-icons/bs';
import type { Note } from '../utils/storage';
import { MdClose } from 'react-icons/md';

interface NoteCardProps {
  note: Note;
  isDeleting?: boolean;
  onEditClick: (note: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
  layout?: 'grid' | 'list';
}

const NoteCard = ({
  note,
  isDeleting,
  onEditClick,
  onDelete,
  onTogglePin,
  layout = 'grid',
}: NoteCardProps) => {
  return (
    <div
      className={`relative bg-gray-800/30 blurred border border-gray-700/40 shadow-lg rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300 ${
        isDeleting ? 'scale-out' : 'scale-in'
      } ${
        layout === 'list'
          ? 'flex flex-row items-start gap-4'
          : 'flex flex-col'
      }`}
      onClick={() => onEditClick(note)}
    >
      {/* Tombol Pin / Unpin */}
      <button
        className={`${
          layout === 'list'
            ? 'absolute top-3 left-3'
            : 'absolute top-3 left-3'
        }`}
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

      {/* Tombol Close */}
      <button
        className={`${
          layout === 'list'
            ? 'absolute top-3 right-3'
            : 'absolute top-3 right-3'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        <MdClose className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" />
      </button>

      {/* Content */}
      <div
        className={
          layout === 'list' ? 'ml-10 mr-10' : 'mt-8'
        }
      >
        <h3 className="font-bold text-lg">
          {note.title || 'Untitled'}
        </h3>
        <p className="mt-2 text-sm line-clamp-3">
          {note.content.replace(/<[^>]+>/g, '') || '...'}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
