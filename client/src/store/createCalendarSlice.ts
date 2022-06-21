import { CalendarSlice, StoreSlice } from "../types";

const createCalendarSlice: StoreSlice<CalendarSlice> = (set, get) => ({
  isCalendarOpen: true,
  toggleIsCalendarOpen: () =>
    set((state) => ({ isCalendarOpen: !state.isCalendarOpen })),
  calendarValue: new Date(),
  setCalendarValue: (value) => set(() => ({ calendarValue: value })),
  title: () => get().calendarValue,
});

export { createCalendarSlice };
