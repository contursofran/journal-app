import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  footer: {
    display: "flex",
    padding: "1rem",
    height: "70px",
    alignItems: "center",
    justifyContent: "right",
  },

  swatches: {
    position: "relative",
    padding: "10px",
    cursor: "pointer",
  },

  swatcher: {
    cursor: "pointer",
  },
}));
