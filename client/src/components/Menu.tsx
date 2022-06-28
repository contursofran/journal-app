import {
  ActionIcon,
  Menu as MenuComponent,
  ColorSwatch,
  useMantineTheme,
  Group,
  Divider,
} from "@mantine/core";
import { Logout, Settings } from "tabler-icons-react";
import useStore from "../store/store";
import { useResponsive } from "../hooks/useResponsive";

function Menu() {
  const theme = useMantineTheme();
  const accentThemes = ["red", "violet", "indigo", "cyan", "yellow"];
  const { iconSize } = useResponsive();

  const setAccentColor = (color: string) => {
    useStore.setState({ accentColor: color });
  };

  const swatches = accentThemes.map((color) => (
    <ColorSwatch
      id={color}
      key={color}
      data-testid={`${color}`}
      color={theme.colors[color][8]}
      onClick={() => setAccentColor(theme.colors[color][8])}
      size={20}
      component="button"
    />
  ));

  return (
    <div>
      <MenuComponent
        closeOnItemClick={false}
        control={
          <ActionIcon id="settings" data-testid="menu">
            <Settings size={iconSize} />
          </ActionIcon>
        }
      >
        <MenuComponent.Label>Accent Color</MenuComponent.Label>

        <Group className="p-2" position="center" align="center">
          {swatches}
        </Group>

        <Divider />
        <MenuComponent.Item color="red" icon={<Logout size={17} />}>
          Logout
        </MenuComponent.Item>
      </MenuComponent>
    </div>
  );
}

export default Menu;
