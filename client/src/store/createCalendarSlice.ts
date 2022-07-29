import { CalendarSlice, StoreSlice } from "../types";

const createCalendarSlice: StoreSlice<CalendarSlice> = () => ({
  isCalendarOpen: true,
  calendarValue: new Date(),
});

export { createCalendarSlice };
