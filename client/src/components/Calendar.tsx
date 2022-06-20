import { Transition } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import { useEffect, useState } from "react";
import useStore from "../store/store";

function Calendar() {
  const { calendarValue, setCalendarValue, isOpen, notes, accentColor } =
    useStore();
  const [dates, setdates] = useState<Date[]>([]);
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);
  useEffect(() => {
    let datesArray = notes.map((note) => new Date(new Date(note.date))).sort();

    datesArray.map((date) => {
      date.setDate(date.getDate() + 1);
    });

    const currentMonthDatesArray = datesArray.filter(
      (date) => date.getMonth() === calendarValue.getMonth()
    );

    setCurrentMonthDates(currentMonthDatesArray);
    setdates(datesArray);
  }, [notes]);

  const handleMonthChange = (month: Date) => {
    const currentMonthDatesArray = dates.filter(
      (date) => date.getMonth() === month.getMonth()
    );

    setCurrentMonthDates(currentMonthDatesArray);
  };

  return (
    <div
      className="relative left-10 max-w-[15%] sm:max-w-xs xl:max-w-[25%] 2xl:max-w-sm"
      data-testid="calendar"
    >
      <Transition mounted={isOpen} transition="slide-down">
        {(styles) => (
          <div style={styles}>
            <CalendarComponent
              id="calendar"
              fullWidth
              value={calendarValue}
              onMonthChange={(month) => handleMonthChange(month)}
              onChange={setCalendarValue}
              dayStyle={(calendarDate) =>
                currentMonthDates
                  .map((date) => date.getDate())
                  .includes(calendarDate.getDate())
                  ? {
                      color: accentColor,
                      fontWeight: "bold",
                    }
                  : { color: "white" }
              }
              styles={() => ({
                selected: {
                  backgroundColor: `${accentColor} !important`,
                  borderRadius: "14%",
                },
              })}
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Calendar;
