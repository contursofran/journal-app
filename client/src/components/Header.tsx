import { Calendar, Moon, Sun, CalendarOff } from "tabler-icons-react";
import { ActionIcon, Group, Title, useMantineColorScheme } from "@mantine/core";
import Menu from "./Menu";
import useStore from "../store/store";

function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleIsOpen = useStore((state) => state.toggleIsOpen);
  const isCalendarOpen = useStore((state) => state.isOpen);
  const title = useStore((state) => state.title().toDateString().slice(4));

  return (
    <div data-testid="Header" className="h-10 p-4 ">
      <Group className="h-full" position="apart" align="center">
        <Group position="left">
          <ActionIcon id="calendar-button" onClick={toggleIsOpen} radius="xl">
            {isCalendarOpen ? (
              <CalendarOff size={23} />
            ) : (
              <Calendar size={23} />
            )}
          </ActionIcon>
          <Title order={2} className="relative left-4">
            {title}
          </Title>
        </Group>

        <Group position="right">
          <ActionIcon
            id="theme-toggle"
            data-testid="change-theme"
            onClick={() => toggleColorScheme()}
            radius="xl"
          >
            {colorScheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
          </ActionIcon>
          <Menu />
        </Group>
      </Group>
    </div>
  );
}

export default Header;
