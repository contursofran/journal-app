import {
  ActionIcon,
  Menu as MenuComponent,
  ColorSwatch,
  Group,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Check, Logout, Settings } from "tabler-icons-react";
import { useResponsive } from "../../hooks/useResponsive";
import { useStore } from "../../store";
import { getColorName } from "../../utils";
import { colors } from "../../utils/constants";
import { useStyles } from "./Menu.styles";

function Menu() {
  const modalOpened = useStore((state) => state.modalOpened);

  const { classes } = useStyles();
  const { iconSize } = useResponsive();
  const theme = useMantineTheme();

  const setAccentColor = (color: string) => {
    useStore.setState({ accentColor: color });
  };

  const swatches = colors.map((color) => (
    <ColorSwatch
      className={classes.swatcher}
      component="button"
      id={color}
      key={color}
      data-testid={color}
      color={
        theme.colorScheme === "dark"
          ? theme.colors[color][8]
          : theme.colors[color][5]
      }
      onClick={() => setAccentColor(color)}
      size={20}
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

      <Group className={classes.swatches} position="center" align="center">
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
