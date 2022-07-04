import { Transition, useMantineTheme } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useStyles } from "./Calendar.styles";
import { useResponsive } from "../../hooks/useResponsive";
import { useStore } from "../../store";

function Calendar() {
  const { classes } = useStyles();

  const accentColor = useStore((state) => state.accentColor);
  const calendarValue = useStore((state) => state.calendarValue);
  const isCalendarOpen = useStore((state) => state.isCalendarOpen);
  const notes = useStore((state) => state.notes);
  const setNoteModified = useStore((state) => state.setNoteModified);

  const [dates, setdates] = useState<Date[]>([]);
  const [currentMonthDates, setCurrentMonthDates] = useState<Date[]>([]);
  const theme = useMantineTheme();
  const { size } = useResponsive();

  const setCalendarValue = (value: Date) => {
    useStore.setState({ calendarValue: value });
    setNoteModified(false);
  };

  useEffect(() => {
    const datesArray = notes
      .map((note) => new Date(new Date(note.date)))
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

  const fontColor = () => {
    switch (theme.colorScheme) {
      case "light":
        return "#000";
      case "dark":
        return "#fff";
      default:
        return "#fff";
    }
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
                    color: accentColor.color,
                    fontWeight: "bold",
                  }
                : { color: fontColor() }
            }
            styles={() => ({
              selected: {},
            })}
          />
        </div>
      )}
    </Transition>
  );
}

export { Calendar };
