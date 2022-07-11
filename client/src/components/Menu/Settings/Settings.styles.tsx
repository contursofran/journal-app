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
    width: "69%",
  },

  markLabel: {
    fontWeight: 550,
    color: "#7c7c7c",
  },

  sliderContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
