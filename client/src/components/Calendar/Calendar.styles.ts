import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100%",
    maxWidth: "20%",
    selfAlign: "center",
  },

  selected: {
    borderRadius: "20%",
    color: "#fff !important",
  },
}));
