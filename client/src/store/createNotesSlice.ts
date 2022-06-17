import { NotesSlice, StoreSlice } from "../types";

const createNotesSlice: StoreSlice<NotesSlice> = (set, get) => ({
  notes: [],
  setNotes: (notes) => set(() => ({ notes })),
});

export { createNotesSlice };
