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
    color: theme.colors.gray[6],
  },

  swatches: {
    alignSelf: "center",
  },

  slider: {
    paddingTop: "22px",
    paddingBottom: "30px",
  },
}));
