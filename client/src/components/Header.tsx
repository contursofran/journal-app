import { Calendar, Moon, Sun, Settings } from "tabler-icons-react";
import { ActionIcon, Group, Title, useMantineColorScheme } from "@mantine/core";
import Menu from "./Menu";
import useStore from "../store/store";

function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleIsOpen = useStore((state) => state.toggleIsOpen);
  const title = useStore((state) => state.title().toDateString().slice(4));

  return (
    <div className="h-10 p-4 ">
      <Group className="h-full" position="apart" align="center">
        <Group position="left">
          <ActionIcon onClick={toggleIsOpen} radius="xl">
            <Calendar size={23} />
          </ActionIcon>
          <Title order={2} className="left-4 relative">
            {title}
          </Title>
        </Group>

        <Group position="right">
          <ActionIcon onClick={() => toggleColorScheme()} radius="xl">
            {colorScheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
          </ActionIcon>
          <ActionIcon radius="xl">
            <Menu />
          </ActionIcon>
        </Group>
      </Group>
    </div>
  );
}

export default Header;
