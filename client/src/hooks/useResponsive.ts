import { MantineSize, TitleOrder } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

function useResponsive() {
  const [iconSize, setIconSize] = useState<number>();
  const [fontSize, setFontSize] = useState<TitleOrder>();
  const [size, setSize] = useState<MantineSize>("sm");

  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isTablet) {
      setIconSize(22);
      setFontSize(3);
      setSize("xs");
    } else if (isDesktop) {
      setIconSize(25);
      setFontSize(2);
      setSize("sm");
    }
  }, [isTablet, isDesktop]);

  return { iconSize, fontSize, size };
}

export { useResponsive };
