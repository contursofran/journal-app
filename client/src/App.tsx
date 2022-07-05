import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import { Main } from "./layouts/Main";
import { getNotes } from "./services/notesService";
import { useStore } from "./store";

const useStyles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

function App() {
  const setNotes = useStore((state) => state.setNotes);
  const accentColor = useStore((state) => state.accentColor);

  const { classes } = useStyles();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();

      const fixData = data.map((note) => ({
        ...note,
        date: new Date(new Date(note.date).getTime() + 86400000), // adds 1 day to the date
      }));

      setNotes(fixData);
    };
    fetchNotes();
  }, [setNotes]);
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
        <div className={classes.root}>
          <Header />
          <Main />
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
