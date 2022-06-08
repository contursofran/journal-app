import { Button, Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";
import { ArrowBarLeft } from "tabler-icons-react";

function SideBar() {
  const [value, setValue] = useState<Date | null>();

  return (
    <Group position="left">
      <Calendar value={value} onChange={setValue} />
      <Button radius="xl" variant="subtle" compact>
        <ArrowBarLeft size={20} />
      </Button>
    </Group>
  );
}

export default SideBar;
