import {
  ActionIcon,
  Menu as MenuComponent,
  ColorSwatch,
  Group,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Logout, Settings } from "tabler-icons-react";
import { useResponsive } from "../hooks/useResponsive";
import { Authentication } from "./Authentication";
import useStore from "../store/store";
import { accentColors } from "../utils/constants";

function Menu() {
  const { iconSize } = useResponsive();
  const theme = useMantineTheme();
  const [activeAccentColor, setActiveAccentColor] = useState<string>();
  const [accentColor, setAccentColor] = useState<string>();
  const modalOpened = useStore((state) => state.modalOpened);

  const swatches = accentColors.map((color) => (
    <ColorSwatch
      id={color}
      key={color}
      data-testid={`${color}`}
      color={
        theme.colorScheme === "dark"
          ? theme.colors[color][7]
          : theme.colors[color][4]
      }
      onClick={() => setActiveAccentColor(color)}
      size={20}
      component="button"
    />
  ));

  useEffect(() => {
    if (theme.colorScheme === "dark") {
      switch (activeAccentColor) {
        case "red":
          setAccentColor(theme.colors.red[8]);
          break;
        case "indigo":
          setAccentColor(theme.colors.indigo[8]);
          break;
        case "cyan":
          setAccentColor(theme.colors.cyan[8]);
          break;
        case "violet":
          setAccentColor(theme.colors.violet[8]);
          break;
        case "yellow":
          setAccentColor(theme.colors.yellow[8]);
          break;
        default:
          setAccentColor(theme.colors.indigo[8]);
      }
    } else {
      switch (activeAccentColor) {
        case "red":
          setAccentColor(theme.colors.red[5]);
          break;
        case "indigo":
          setAccentColor(theme.colors.indigo[5]);
          break;
        case "cyan":
          setAccentColor(theme.colors.cyan[5]);
          break;
        case "violet":
          setAccentColor(theme.colors.violet[5]);
          break;
        case "yellow":
          setAccentColor(theme.colors.yellow[5]);
          break;
        default:
          setAccentColor(theme.colors.indigo[5]);
      }
    }
    useStore.setState({ accentColor });
  }, [activeAccentColor, theme, accentColor]);

  return (
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
      <MenuComponent.Item
        onClick={() => useStore.setState({ modalOpened: true })}
        color="red"
        icon={<Logout size={17} />}
      >
        Login
      </MenuComponent.Item>
    </MenuComponent>
  );
}

export default Menu;
