import { ApplicationSlice, StoreSlice } from "../types";

const createApplicationSlice: StoreSlice<ApplicationSlice> = (set, get) => ({
  accentColor: "#1971c2",
  status: "saving",
  setStatus: (status) => set(() => ({ status })),
  noteModified: false,
  setNoteModified: (noteModified) => set(() => ({ noteModified })),
});

export { createApplicationSlice };
