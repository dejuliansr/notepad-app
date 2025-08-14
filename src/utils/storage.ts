export interface Note {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
}

const NOTES_KEY = 'my-notes';
const LAYOUT_KEY = 'my-layout';

export const getNotes = (): Note[] =>
  JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');

export const saveNotes = (notes: Note[]) =>
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

export const getLayout = (): 'grid' | 'list' => {
  const saved = localStorage.getItem(LAYOUT_KEY);
  return saved === 'list' ? 'list' : 'grid';
};

export const saveLayout = (layout: 'grid' | 'list') =>
  localStorage.setItem(LAYOUT_KEY, layout);
