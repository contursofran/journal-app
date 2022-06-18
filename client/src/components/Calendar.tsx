import { Transition, useMantineTheme } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import { useEffect, useState } from "react";
import useStore from "../store/store";

function Calendar() {
  const { calendarValue, setCalendarValue, isOpen, colorScheme, notes } =
    useStore();
  const color = useMantineTheme();
  const weekendColor =
    colorScheme === "dark"
      ? `${color.colors.dark[0]} !important`
      : `${color.colors.dark[3]} !important`;
  const [dates, setdates] = useState<Date[]>([]);
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);

  useEffect(() => {
    const datesArray = notes.map((note) => new Date(note.date)).sort();

    setdates(datesArray);

    const currentMonthDatesArray = dates.filter(
      (date) => date.getMonth() === calendarValue.getMonth()
    );

    setCurrentMonthDates(currentMonthDatesArray);
  }, [notes]);

  const handleMonthChange = (month: Date) => {
    const currentMonthDatesArray = dates.filter(
      (date) => date.getMonth() === month.getMonth()
    );

    setCurrentMonthDates(currentMonthDatesArray);
  };

  console.log(
    "🚀 ~ file: Calendar.tsx ~ line 35 ~ handleMonthChange ~ currentMonthDatesArray",
    currentMonthDates
  );

  return (
    <div
      className="relative left-10 max-w-[15%] sm:max-w-xs xl:max-w-[25%] 2xl:max-w-sm"
      data-testid="calendar"
    >
      <Transition mounted={isOpen} transition="slide-down">
        {(styles) => (
          <div style={styles}>
            <CalendarComponent
              fullWidth
              value={calendarValue}
              onMonthChange={(month) => handleMonthChange(month)}
              onChange={setCalendarValue}
              styles={() => ({
                weekend: {
                  color: weekendColor,
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
