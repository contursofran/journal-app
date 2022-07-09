import {
  Menu as MenuComponent,
  Group,
  Avatar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  ChevronDown,
  Login,
  Settings as SettingsIcon,
} from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useResponsive } from "../../hooks/useResponsive";
import { useStyles } from "./Menu.styles";
import { Settings } from "./Settings";

function Menu() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { iconSize, size } = useResponsive();

  return (
    <>
      <Settings opened={opened} close={close} />
      <MenuComponent
        control={
          <UnstyledButton className={classes.user}>
            <Group spacing={7}>
              <Avatar classNames={classes} radius="xl" size={iconSize + 10} />
              <Text weight={500} size={size}>
                Invited
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <MenuComponent.Item icon={<Login size={20} />}>
          Login
        </MenuComponent.Item>
        <MenuComponent.Item onClick={open} icon={<SettingsIcon size={20} />}>
          Settings
        </MenuComponent.Item>
      </MenuComponent>
    </>
  );
}

export { Menu };
