import { SetState, GetState } from "zustand";
import { ColorScheme } from "@mantine/core";

export type CalendarSlice = {
  isCalendarOpen: boolean;
  toggleIsCalendarOpen: () => void;
  calendarValue: Date;
  setCalendarValue: (value: Date) => void;
  title: () => Date;
};

export type ApplicationSlice = {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
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
