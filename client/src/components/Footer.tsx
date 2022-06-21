import { Group, Loader, Text, ThemeIcon } from "@mantine/core";
import { Check } from "tabler-icons-react";
import useStore from "../store/store";

function Footer() {
  const { status, accentColor } = useStore();

  return (
    <div className="h-10 pr-5 pb-5">
      <Group className="h-full" align={"center"} position="right">
        {status === "saving" ? (
          <Loader size={"sm"} color={accentColor} />
        ) : status === "saved" ? (
          <ThemeIcon color={accentColor}>
            <Check />
          </ThemeIcon>
        ) : null}
      </Group>
    </div>
  );
}

export { Footer };
