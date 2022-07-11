import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  swatchesItem: {
    cursor: "pointer",
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },

  text: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[6]
        : theme.colors.gray[7],
  },

  swatches: {
    alignSelf: "center",
  },

  slider: {
    width: "69%",
  },

  labelText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[8],
  },
}));
