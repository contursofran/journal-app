import { Group, Loader } from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import { useEffect } from "react";
import { Check } from "tabler-icons-react";
import useStore from "../store/store";

function Footer() {
  const accentColor = useStore((state) => state.accentColor);
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const noteModified = useStore((state) => state.noteModified);

  const idle = useIdle(2000, { events: ["keypress"] });
  useEffect(() => {
    if (idle && noteModified) {
      setStatus("saving");
    } else {
      setStatus("");
    }
  }, [idle, setStatus, noteModified]);

  const statusFunction = () => {
    switch (status) {
      case "saving":
        return <Loader size={23} color={accentColor} />;
      case "saved":
        return <Check size={25} color={accentColor} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-10 pr-5 pb-5">
      <Group className="h-full" align="center" position="right">
        {statusFunction()}
      </Group>
    </div>
  );
}

export { Footer };
