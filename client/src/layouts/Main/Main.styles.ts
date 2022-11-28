import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  main: {
    display: "flex",
    flex: "auto",
    padding: "2.5rem",
    gap: "2.5rem",
    alignItems: "center",
  },

  scrollAreaViewport: {
    "& > div": {
      display: "flex !important",
    },
    display: "flex",
    // alignItems: "center",
  },
}));
