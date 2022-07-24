import {
  Menu as MenuComponent,
  Group,
  Avatar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  Check,
  ChevronDown,
  Login as LoginIcon,
  Settings as SettingsIcon,
} from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useResponsive } from "../../hooks/useResponsive";
import { useStyles } from "./Menu.styles";
import { Settings } from "./Settings";
import { Auth } from "./Auth";
import { useStore } from "../../store";
import { logoutUser } from "../../services/authService";

function Menu() {
  const [settings, settingsHandler] = useDisclosure(false);
  const [login, loginHandler] = useDisclosure(true);
  const activeUser = useStore((state) => state.activeUser);

  const { classes } = useStyles();
  const { iconSize, size } = useResponsive();

  const logout = () => {
    useStore.setState({
      activeUser: "Guest",
      activeNoteId: null,
      notes: [],
    });
    logoutUser();
    showNotification({
      title: "Logged out",
      message: "You have been logged out",
      icon: <Check />,
      color: "green",
    });
    loginHandler.open();
  };

  return (
    <>
      <Settings opened={settings} close={settingsHandler.close} />
      <Auth opened={login} close={loginHandler.close} />
      <MenuComponent
        control={
          <UnstyledButton data-cy="menu" className={classes.user}>
            <Group spacing={7}>
              <Avatar classNames={classes} radius="xl" size={iconSize + 10} />
              <Text weight={500} size={size}>
                {activeUser}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <MenuComponent.Item
          onClick={settingsHandler.open}
          icon={<SettingsIcon size={20} />}
          data-cy="settings"
        >
          Settings
        </MenuComponent.Item>
        <MenuComponent.Item
          onClick={logout}
          icon={<LoginIcon size={20} />}
          data-cy="logout"
          color="red"
        >
          Logout
        </MenuComponent.Item>
      </MenuComponent>
    </>
  );
}

export { Menu };
