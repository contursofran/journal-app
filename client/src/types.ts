import { SetState, GetState } from "zustand";
import { ColorScheme } from "@mantine/core";

export type CalendarSlice = {
  isOpen: boolean;
  toggleIsOpen: () => void;
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

export type StoreState = CalendarSlice & ApplicationSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;
