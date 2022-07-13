import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  notificationErrorTitle: {
    color:
      theme.colorScheme === "dark" ? theme.colors.red[5] : theme.colors.red[6],
    fontWeight: 550,
  },

  notificationErrorBody: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[7],
  },

  notificationErrorIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.red[5]} !important`
        : `${theme.colors.red[6]} !important`,
  },

  notificationSucessTitle: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.green[5]
        : theme.colors.green[6],
    fontWeight: 550,
  },

  notificationSucessBody: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[7],
  },

  notificationSucessIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.green[5]} !important`
        : `${theme.colors.green[6]} !important`,
  },
}));
