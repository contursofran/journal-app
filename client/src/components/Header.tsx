import { Calendar, Moon, Sun, CalendarOff } from "tabler-icons-react";
import { ActionIcon, Group, Title, useMantineColorScheme } from "@mantine/core";
import Menu from "./Menu";
import useStore from "../store/store";
import { useResponsive } from "../hooks/useResponsive";

function Header() {
  const isCalendarOpen = useStore((state) => state.isCalendarOpen);
  const calendarValue = useStore((state) => state.calendarValue);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { fontSize, iconSize } = useResponsive();

  const title = calendarValue.toDateString().slice(4);

  const toggleIsCalendarOpen = () => {
    useStore.setState({ isCalendarOpen: !isCalendarOpen });
  };

  return (
    <div data-testid="Header">
      <Group className="h-full" position="apart" align="center">
        <Group position="left" align="center">
          <ActionIcon
            id="calendar-button"
            onClick={toggleIsCalendarOpen}
            radius="xl"
          >
            {isCalendarOpen ? (
              <CalendarOff size={iconSize} />
            ) : (
              <Calendar size={iconSize} />
            )}
          </ActionIcon>
          <Title order={fontSize} className="relative left-1 sm:left-3">
            {title}
          </Title>
        </Group>

        <Group position="right" align="center">
          <ActionIcon
            id="theme-toggle"
            data-testid="change-theme"
            onClick={() => toggleColorScheme()}
            radius="xl"
          >
            {colorScheme === "dark" ? (
              <Sun size={iconSize} />
            ) : (
              <Moon size={iconSize} />
            )}
          </ActionIcon>
          <Menu />
        </Group>
      </Group>
    </div>
  );
}

export default Header;
