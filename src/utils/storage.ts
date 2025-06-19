export interface Note {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
}

const NOTES_KEY = 'my-notes';

export const getNotes = (): Note[] =>
  JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');

export const saveNotes = (notes: Note[]) =>
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
