import notes from "../data";
import { Note } from "types";

const getNotes = (): Note[] => notes;

const updateNote = (note: Note): Note | undefined => {
  const findNote = notes.find((n) => n.id === note.id);

  if (findNote) {
    findNote.body = note.body;
  }

  return findNote;
};

export default {
  getNotes,
  updateNote,
};
