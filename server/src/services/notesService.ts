import notes from "../data";
import { Note } from "types";

const getNotes = (): Note[] => notes;

export default {
  getNotes,
};
