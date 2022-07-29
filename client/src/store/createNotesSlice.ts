import { NotesSlice, StoreSlice } from "../types";

const createNotesSlice: StoreSlice<NotesSlice> = (set) => ({
  notes: [],
  setNotes: (notes) => set(() => ({ notes })),
  activeNoteId: "",
});

export { createNotesSlice };
