import { CalendarSlice, StoreSlice } from "../types";

const createCalendarSlice: StoreSlice<CalendarSlice> = (set, get) => ({
  isCalendarOpen: true,
  calendarValue: new Date(),
});

export { createCalendarSlice };
