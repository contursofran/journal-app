import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  user: {
    borderRadius: theme.radius.sm,
    padding: "2px",
    paddingRight: "4px",
  },

  placeholder: {
    backgroundColor: theme.colorScheme === "dark" ? "#1a1b1e" : "#ffffff",
  },

  placeholderIcon: {
    color: theme.colorScheme === "dark" ? "#ced4da" : "#495057",
  },
}));
