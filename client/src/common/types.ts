import { SetState, GetState } from "zustand";
import { NoteService } from "../services/notesService";

export type CalendarSlice = {
  isCalendarOpen: boolean;
  calendarValue: Date;
};

export type ApplicationSlice = {
  accentColor: string;
  status: string;
  setStatus: (status: string) => void;
  noteModified: boolean;
  setNoteModified: (noteModified: boolean) => void;
  editorFontSize: number;
  activeUser: string;
};

export type NotesSlice = {
  notes: NoteService[];
  activeNoteId: string | null;
  setNotes: (notes: NoteService[]) => void;
};

export type StoreState = CalendarSlice & ApplicationSlice & NotesSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;
