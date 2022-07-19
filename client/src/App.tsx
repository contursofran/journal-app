import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createStyles,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import { Main } from "./layouts/Main";
import { useStore } from "./store";

const useStyles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

function App() {
  const accentColor = useStore((state) => state.accentColor);

  const { classes } = useStyles();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor: accentColor,
          primaryShade: { light: 5, dark: 8 },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-center">
          <div className={classes.root}>
            <Header />
            <Main />
            <Footer />
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
