import { Loader, Tooltip, useMantineTheme } from "@mantine/core";
import { Check } from "tabler-icons-react";
import { useResponsive } from "../../hooks/useResponsive";
import { useStore } from "../../store";
import { primaryColorShade } from "../../utils";
import { useStyles } from "./Status.styles";

function Status() {
  const status = useStore((state) => state.status);

  const { size, iconSize } = useResponsive();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  switch (status) {
    case "saving":
      return (
        <Tooltip className={classes.icon} label="Saving..." position="left">
          <Loader size={size} color={primaryColorShade(theme)} />
        </Tooltip>
      );
    case "saved":
      return (
        <Tooltip className={classes.icon} label="Saved" position="left">
          <Check size={iconSize} color={primaryColorShade(theme)} />
        </Tooltip>
      );
    default:
      return null;
  }
}

export { Status };
