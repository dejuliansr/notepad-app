import { useEffect, useState } from 'react';
import './assets/styles/app.css';

import {
  getNotes,
  saveNotes,
  getLayout,
  saveLayout,
  type Note,
} from './utils/storage';
import NoteCard from './components/NoteCard';
import AddButton from './components/AddButton';
import SearchBar from './components/SearchBar';
import NoteModal from './components/NoteModal';
import ToggleLayoutButton from './components/ToggleLayoutButton';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    'add' | 'edit'
  >('add');
  const [activeNote, setActiveNote] = useState<
    Note | undefined
  >(undefined);
  const [layout, setLayout] = useState<'grid' | 'list'>(
    'grid'
  );

  useEffect(() => {
    const loadedNotes = getNotes();
    const savedLayout = getLayout();
    setNotes(loadedNotes);
    setLayout(savedLayout);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveNotes(notes);
    }
  }, [notes, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveLayout(layout);
    }
  }, [layout, isInitialized]);

  const handleAddClick = () => {
    setModalMode('add');
    setActiveNote(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (note: Note) => {
    setModalMode('edit');
    setActiveNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (note: Note) => {
    if (modalMode === 'add') {
      setNotes([note, ...notes]);
    } else {
      setNotes(
        notes.map((n) => (n.id === note.id ? note : n))
      );
    }
  };

  const [deletingNoteIds, setDeletingNoteIds] = useState<
    number[]
  >([]);
  const deleteNote = (id: number) => {
    setDeletingNoteIds((prev) => [...prev, id]);

    setTimeout(() => {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => n.id !== id)
      );
      setDeletingNoteIds((prev) =>
        prev.filter((noteId) => noteId !== id)
      );
    }, 300);
  };

  const togglePin = (id: number) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, isPinned: !n.isPinned } : n
      )
    );
  };

  const filteredNotes = notes
    .filter(
      (n) =>
        n.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        n.content
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  const [isClosingModal, setIsClosingModal] =
    useState(false);
  const handleCloseModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosingModal(false);
    }, 300);
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900
      text-white p-4"
      >
        <div className="w-full max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-8">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <ToggleLayoutButton
              layout={layout}
              onToggle={() =>
                setLayout(
                  layout === 'grid' ? 'list' : 'grid'
                )
              }
            />
          </div>

          <div
            className={
              layout === 'grid'
                ? 'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                : 'flex flex-col gap-4'
            }
          >
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isDeleting={deletingNoteIds.includes(
                  note.id
                )}
                onEditClick={handleEditClick}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                layout={layout}
              />
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center text-3xl md:text-5xl text-white/60 mt-20">
              No notes found
            </div>
          )}

          <div className="fixed bottom-10 inset-x-0 flex justify-end max-w-7xl mx-auto px-4">
            <AddButton onClick={handleAddClick} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <NoteModal
          mode={modalMode}
          note={activeNote}
          onSave={handleSaveNote}
          onClose={handleCloseModal}
          isClosing={isClosingModal}
        />
      )}
    </>
  );
}

export default App;
