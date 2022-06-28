import { Group, Loader, Tooltip } from "@mantine/core";

import { Check } from "tabler-icons-react";
import { useResponsive } from "../hooks/useResponsive";
import useStore from "../store/store";

function Footer() {
  const accentColor = useStore((state) => state.accentColor);
  const status = useStore((state) => state.status);
  const { size, iconSize } = useResponsive();

  const statusCase = () => {
    switch (status) {
      case "saving":
        return (
          <Tooltip label="Saving..." withArrow>
            <Loader size={size} color={accentColor} />
          </Tooltip>
        );
      case "saved":
        return (
          <Tooltip label="Saved" withArrow position="left">
            <Check size={iconSize} color={accentColor} />
          </Tooltip>
        );
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
