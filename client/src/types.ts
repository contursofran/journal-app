import { SetState, GetState } from "zustand";

export type CalendarSlice = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  calendarValue: Date;
  setCalendarValue: (value: Date) => void;
  title: () => Date;
};

export type StoreState = CalendarSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;
