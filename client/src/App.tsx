import { MantineProvider, ColorSchemeProvider, Stack } from "@mantine/core";
import { useEffect } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Editor from "./components/Editor";
import useStore from "./store/store";
import { getNotes } from "./services/notesService";

function App() {
  const { colorScheme, toggleColorScheme, setNotes } = useStore(
    (state) => state
  );

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
  }, []);

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
            <div className="flex flex-grow items-center justify-center">
              <Calendar />
              <div className="flex h-full w-full  justify-center px-20 py-16">
                <Editor />
              </div>
            </div>
          </div>
        </Stack>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
