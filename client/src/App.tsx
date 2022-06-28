import {
  MantineProvider,
  ColorSchemeProvider,
  Stack,
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
        <Stack className="min-h-screen">
          <Header />
          <div className="flex flex-grow flex-nowrap justify-between">
            <div className="flex flex-grow items-center justify-center  ">
              <div className="relative left-10 max-w-[20%]">
                <Calendar />
              </div>
              <div className="flex h-full w-full  justify-center px-20 py-16">
                <Editor />
              </div>
            </div>
          </div>
          <Footer />
        </Stack>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
