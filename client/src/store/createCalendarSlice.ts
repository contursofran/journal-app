import { CalendarSlice, StoreSlice } from "../types";

const createCalendarSlice: StoreSlice<CalendarSlice> = (set, get) => ({
  isOpen: true,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  calendarValue: new Date(),
  setCalendarValue: (value) => set(() => ({ calendarValue: value })),
  title: () => get().calendarValue,
  accentColor: "blue",
  setAccentColor: (color) => set(() => ({ accentColor: color })),
});

export default createCalendarSlice;
