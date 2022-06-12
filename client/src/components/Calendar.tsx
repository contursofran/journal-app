import { Transition } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import useStore from "../store/store";

function Calendar() {
  const value = useStore((state) => state.calendarValue);
  const isOpen = useStore((state) => state.isOpen);
  const setCalendarValue = useStore((state) => state.setCalendarValue);

  return (
    <div className="relative left-10 xl:max-w-[25%] 2xl:max-w-sm sm:max-w-xs max-w-[15%]">
      <Transition mounted={isOpen} transition="slide-down">
        {(styles) => (
          <div style={styles}>
            <CalendarComponent
              fullWidth
              value={value}
              onChange={setCalendarValue}
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Calendar;
