import { Button, Transition } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";
import { Calendar as CalendarIcon } from "tabler-icons-react";

function SideBar() {
  const [value, setValue] = useState<Date | null>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="calendar">
        <Transition mounted={isOpen} transition="slide-left">
          {(styles) => (
            <div style={styles}>
              <Calendar value={value} onChange={setValue} />
            </div>
          )}
        </Transition>
      </div>
      <div className="calendar-icon">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          radius="xl"
          variant="subtle"
          compact
        >
          <CalendarIcon size={20} />
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
