import { ColorSwatch, useMantineTheme, Group } from "@mantine/core";
import { useStore } from "../../../store";
import { colors } from "../../../utils/constants";
import { useStyles } from "./Settings.styles";

function Swatches() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const setAccentColor = (color: string) => {
    useStore.setState({ accentColor: color });
  };

  const accentColorSwatches = colors.map((color) => (
    <ColorSwatch
      className={classes.swatchesItem}
      component="button"
      data-cy={color}
      key={color}
      data-testid={color}
      color={
        theme.colorScheme === "dark"
          ? theme.colors[color][8]
          : theme.colors[color][5]
      }
      onClick={() => setAccentColor(color)}
      size={27}
    />
  ));

  return (
    <Group className={classes.swatches} align="center" position="center">
      {accentColorSwatches}
    </Group>
  );
}

export { Swatches };
