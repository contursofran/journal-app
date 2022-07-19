import { ApplicationSlice, StoreSlice } from "../common/types";

const createApplicationSlice: StoreSlice<ApplicationSlice> = (set) => ({
  accentColor: "blue",
  status: "",
  setStatus: (status) => set(() => ({ status })),
  noteModified: false,
  setNoteModified: (noteModified) => set(() => ({ noteModified })),
  editorFontSize: 16,
  activeUser: "Invited",
});

export { createApplicationSlice };
