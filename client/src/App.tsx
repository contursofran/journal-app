import React from "react";
import { Grid, Center } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";

function App() {
  const { height, width } = useViewportSize();

  return (
    <div className="App">
      <Center style={{ height, width }}>
        <Grid align="center">
          <Grid.Col span={4}>
            <SideBar />
          </Grid.Col>
          <Grid.Col span={8}>
            <Editor />
          </Grid.Col>
        </Grid>
      </Center>
    </div>
  );
}

export default App;
