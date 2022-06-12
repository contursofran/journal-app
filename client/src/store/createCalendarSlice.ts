import { CalendarSlice, StoreSlice } from "../types";

const createCalendarSlice: StoreSlice<CalendarSlice> = (set) => ({
  isOpen: true,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
});

export default createCalendarSlice;
