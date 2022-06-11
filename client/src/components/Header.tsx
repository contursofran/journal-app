import { Calendar, Moon, Sun, Settings } from "tabler-icons-react";
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import useStore from "../store";

function Header() {
  const toggleIsOpen = useStore((state) => state.toggleIsOpen);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div className="h-10 p-4 ">
      <Group className="h-full" position="apart" align="center">
        <ActionIcon onClick={toggleIsOpen} radius="xl">
          <Calendar size={23} />
        </ActionIcon>
        <Group position="right">
          <ActionIcon onClick={() => toggleColorScheme()} radius="xl">
            {colorScheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}
          </ActionIcon>
          <ActionIcon onClick={toggleIsOpen} radius="xl">
            <Settings size={23} />
          </ActionIcon>
        </Group>
      </Group>
    </div>
  );
}

export default Header;
