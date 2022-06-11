import { Transition } from "@mantine/core";
import { Calendar as CalendarComponent } from "@mantine/dates";
import { useState } from "react";
import useStore from "../store";

function Calendar() {
  const [value, setValue] = useState<Date | null>();
  const isOpen = useStore((state) => state.isOpen);
  return (
    <div className="relative left-10 sm:max-w-[25%] xl:max-w-sm">
      <Transition mounted={isOpen} transition="slide-down">
        {(styles) => (
          <div style={styles}>
            <CalendarComponent fullWidth value={value} onChange={setValue} />
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Calendar;
