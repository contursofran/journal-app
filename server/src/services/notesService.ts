import { Note } from "types";
import notes from "../data";

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
