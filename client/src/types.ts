import { SetState, GetState } from "zustand";
import { ColorScheme } from "@mantine/core";

export type CalendarSlice = {
  isCalendarOpen: boolean;
  calendarValue: Date;
};

export type ApplicationSlice = {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
  accentColor: string;
  status: string;
  setStatus: (status: string) => void;
};

export type NotesSlice = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export type StoreState = CalendarSlice & ApplicationSlice & NotesSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;

export interface Note {
  id: number;
  date: Date;
  body: string;
}
