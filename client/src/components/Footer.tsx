import { Group, Loader } from "@mantine/core";

import { Check } from "tabler-icons-react";
import useStore from "../store/store";

function Footer() {
  const accentColor = useStore((state) => state.accentColor);
  const status = useStore((state) => state.status);

  const statusCase = () => {
    switch (status) {
      case "saving":
        return <Loader size="sm" color={accentColor} />;
      case "saved":
        return <Check size={23} color={accentColor} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-10 pr-5 pb-5">
      <Group className="h-full" align="center" position="right">
        {statusCase()}
      </Group>
    </div>
  );
}

export { Footer };
