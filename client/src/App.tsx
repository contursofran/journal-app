import React, { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Stack,
} from "@mantine/core";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Editor from "./components/Editor";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
          <div className="flex justify-between flex-grow flex-nowrap">
            <div className="flex flex-grow justify-center items-center">
              <Calendar />
              <div className="flex h-full justify-center  w-full px-20 py-16">
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
