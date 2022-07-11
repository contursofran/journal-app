import { Calendar, Moon, Sun, CalendarOff } from "tabler-icons-react";
import { ActionIcon, Group, Title, useMantineColorScheme } from "@mantine/core";
import { useStyles } from "./Header.styles";
import { useStore } from "../../store";
import { useResponsive } from "../../hooks/useResponsive";
import { Menu } from "../../components/Menu";

function Header() {
  const isCalendarOpen = useStore((state) => state.isCalendarOpen);
  const calendarValue = useStore((state) => state.calendarValue);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const { fontSize, iconSize } = useResponsive();

  const title = calendarValue.toDateString().slice(4);

  const toggleIsCalendarOpen = () => {
    useStore.setState({ isCalendarOpen: !isCalendarOpen });
  };

  return (
    <div data-testid="Header" className={classes.header}>
      <div className={classes.inner}>
        <Group position="left" align="center">
          <ActionIcon
            data-cy="calendar-button"
            onClick={toggleIsCalendarOpen}
            radius="xs"
            variant="transparent"
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

        <Group position="right" spacing="xs" align="center">
          <ActionIcon
            data-cy="theme-toggle"
            variant="transparent"
            data-testid="change-theme"
            onClick={() => toggleColorScheme()}
            radius="xs"
          >
            {colorScheme === "dark" ? (
              <Sun size={iconSize} />
            ) : (
              <Moon size={iconSize} />
            )}
          </ActionIcon>
          <Menu />
        </Group>
      </div>
    </div>
  );
}

export { Header };
