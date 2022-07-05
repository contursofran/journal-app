import { MantineTheme } from "@mantine/core";

export function getColorName(color: string) {
  switch (color) {
    case "#fa5252":
      return "red";
    case "#7950f2":
      return "violet";
    case "#4c6EF5":
      return "indigo";
    case "#1C7ED6":
      return "blue";
    case "#1098ad":
      return "cyan";
    case "#f59f00":
      return "yellow";
    default:
      return "blue";
  }
}

export function primaryColorShade(theme: MantineTheme) {
  return theme.colors[theme.primaryColor][
    Object(theme.primaryShade)[theme.colorScheme]
  ];
}
