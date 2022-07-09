import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  user: {
    borderRadius: theme.radius.sm,
    padding: "2px",
    paddingRight: "4px",
  },

  swatchesItem: {
    cursor: "pointer",
  },

  placeholder: {
    backgroundColor: theme.colorScheme === "dark" ? "#1a1b1e" : "#ffffff",
  },

  placeholderIcon: {
    color: theme.colorScheme === "dark" ? "#ced4da" : "#495057",
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
    paddingTop: "20px",
    paddingBottom: "13px",
  },
}));
