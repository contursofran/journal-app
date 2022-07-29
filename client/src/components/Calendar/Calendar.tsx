import { Transition, useMantineTheme } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useStyles } from "./Calendar.styles";
import { useResponsive } from "../../hooks/useResponsive";
import { useStore } from "../../store";
import { primaryColorShade } from "../../utils/mantine";

function Calendar() {
  const calendarValue = useStore((state) => state.calendarValue);
  const isCalendarOpen = useStore((state) => state.isCalendarOpen);
  const notes = useStore((state) => state.notes);
  const setNoteModified = useStore((state) => state.setNoteModified);

  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { size } = useResponsive();

  const [dates, setdates] = useState<Date[]>([]);
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);

  const getNoteId = (date: Date) => {
    const foundNote = notes.find(
      (note) =>
        note.createdAt.getDate() === date.getDate() &&
        note.createdAt.getMonth() === date.getMonth()
    );
    return foundNote ? foundNote._id : null;
  };

  const setCalendarValue = (value: Date) => {
    useStore.setState({ calendarValue: value });
    useStore.setState({ activeNoteId: getNoteId(value) });
    setNoteModified(false);
  };

  useEffect(() => {
    const datesArray = notes
      .map((note) => new Date(new Date(note.createdAt)))
      .sort();

    const currentMonthDatesArray = datesArray.filter(
      (date) => date.getMonth() === calendarValue.getMonth()
    );

    setCurrentMonthDates(currentMonthDatesArray);
    setdates(datesArray);
  }, [notes, calendarValue]);

  const handleMonthChange = (month: Date) => {
    const MonthChangeDates = dates.filter(
      (date) => date.getMonth() === month.getMonth()
    );

    setCurrentMonthDates(MonthChangeDates);
  };

  return (
    <Transition mounted={isCalendarOpen} transition="slide-down">
      {(styles) => (
        <div className={classes.wrapper} style={styles}>
          <CalendarComponent
            size={size}
            classNames={{
              selected: classes.selected,
            }}
            id="calendar"
            data-testid="calendar"
            fullWidth
            value={calendarValue}
            onMonthChange={(month) => handleMonthChange(month)}
            onChange={(value: Date) => setCalendarValue(value)}
            dayStyle={(calendarDate) =>
              currentMonthDates
                .map((date) => date.getDate())
                .includes(calendarDate.getDate())
                ? {
                    fontWeight: "bold",
                    color: primaryColorShade(theme),
                  }
                : { color: theme.colorScheme === "dark" ? "#fff" : "#000" }
            }
          />
        </div>
      )}
    </Transition>
  );
}

export { Calendar };
