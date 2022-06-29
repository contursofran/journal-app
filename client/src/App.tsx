import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Calendar from "./components/Calendar";
import Editor from "./components/Editor";
import useStore from "./store/store";
import { getNotes } from "./services/notesService";

function App() {
  const setNotes = useStore((state) => state.setNotes);
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
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className="flex min-h-screen flex-col">
          <div className="h-14 p-4">
            <Header />
          </div>
          <div className="flex h-full flex-grow flex-nowrap items-center justify-between gap-10 p-10 lg:gap-10 lg:p-16">
            <Calendar />
            <div className="w-full self-stretch">
              <Editor />
            </div>
          </div>
          <div className="h-14  p-4">
            <Footer />
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
