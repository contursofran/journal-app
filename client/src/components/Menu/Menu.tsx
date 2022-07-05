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
import { useResponsive } from "../../hooks/useResponsive";
import { useStore } from "../../store";
import { getColorName } from "../../utils";
import { colors } from "../../utils/constants";

function Menu() {
  const { iconSize } = useResponsive();
  const theme = useMantineTheme();
  const modalOpened = useStore((state) => state.modalOpened);

  const setAccentColor = (color: string) => {
    useStore.setState({ accentColor: color });
  };

  const swatches = colors.map((color) => (
    <ColorSwatch
      id={color}
      key={getColorName(color)}
      data-testid={`${color}`}
      color={
        theme.colorScheme === "dark"
          ? theme.colors[color][8]
          : theme.colors[color][5]
      }
      onClick={() => setAccentColor(color)}
      size={20}
      component="button"
    />
  ));

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

export { Menu };
