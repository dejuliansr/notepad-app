import { useEffect, useState } from 'react';
import {
  getNotes,
  saveNotes,
  type Note,
} from './utils/storage';
import NoteCard from './components/NoteCard';
import AddButton from './components/AddButton';
import SearchBar from './components/SearchBar';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveNotes(notes);
    }
  }, [notes, isInitialized]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: '',
      content: '',
      isPinned: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (updated: Note) => {
    setNotes(
      notes.map((n) => (n.id === updated.id ? updated : n))
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
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

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="w-full max-w-7xl mx-auto px-4 py-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={updateNote}
                onDelete={deleteNote}
                onTogglePin={togglePin}
              />
            ))}
          </div>

          <div className="fixed bottom-10 inset-x-0 flex justify-end max-w-7xl mx-auto px-4">
            <AddButton onClick={addNote} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
