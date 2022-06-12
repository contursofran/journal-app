import { SetState, GetState } from "zustand";

export type CalendarSlice = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

export type StoreState = CalendarSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;
