import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  wrapper: {
    width: "100%",
    alignSelf: "stretch",
  },

  editor: {
    height: "100%",
  },

  scrollAreaViewport: {
    "& > div": {
      // display: "flex !important",
      height: "100%",
    },
    height: "100%",
  },
}));
