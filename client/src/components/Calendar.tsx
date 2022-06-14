import { Transition, useMantineTheme } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import useStore from "../store/store";

function Calendar() {
  const { calendarValue, setCalendarValue, isOpen, colorScheme } = useStore(
    (state) => state
  );
  const color = useMantineTheme();
  const weekendColor =
    colorScheme === "dark"
      ? `${color.colors.dark[0]} !important`
      : `${color.colors.dark[3]} !important`;

  return (
    <div
      className="relative left-10 xl:max-w-[25%] 2xl:max-w-sm sm:max-w-xs max-w-[15%]"
      data-testid="calendar"
    >
      <Transition mounted={isOpen} transition="slide-down">
        {(styles) => (
          <div style={styles}>
            <CalendarComponent
              fullWidth
              value={calendarValue}
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
