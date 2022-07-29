import { ApplicationSlice, StoreSlice } from "../types";

const createApplicationSlice: StoreSlice<ApplicationSlice> = (set) => ({
  accentColor: "blue",
  status: "",
  setStatus: (status) => set(() => ({ status })),
  noteModified: false,
  setNoteModified: (noteModified) => set(() => ({ noteModified })),
  editorFontSize: 16,
  activeUser: "Guest",
});

export { createApplicationSlice };
