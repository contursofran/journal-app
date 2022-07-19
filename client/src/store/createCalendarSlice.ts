import { CalendarSlice, StoreSlice } from "../common/types";

const createCalendarSlice: StoreSlice<CalendarSlice> = () => ({
  isCalendarOpen: true,
  calendarValue: new Date(),
});

export { createCalendarSlice };
