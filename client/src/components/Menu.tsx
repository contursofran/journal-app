import {
  ActionIcon,
  SegmentedControl,
  Menu as MenuComponent,
  ColorSwatch,
  useMantineTheme,
  Group,
  Divider,
} from "@mantine/core";
import { Check, Logout, Settings } from "tabler-icons-react";
import useStore from "../store/store";

function Menu() {
  const theme = useMantineTheme();
  const { accentColor, setAccentColor } = useStore((state) => state);

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      component="button"
      size={25}
      key={color}
      color={theme.colors[color][6]}
      onClick={() => setAccentColor(color)}
    />
  ));

  return (
    <div>
      <MenuComponent
        closeOnItemClick={false}
        control={
          <ActionIcon>
            <Settings size={23} />
          </ActionIcon>
        }
      >
        <MenuComponent.Label>Accent Color</MenuComponent.Label>

        <Group className="p-2" position="center" align="center">
          {swatches}
        </Group>

        <Divider />
        <MenuComponent.Item color="red" icon={<Logout size={17} />}>
          Logout
        </MenuComponent.Item>
      </MenuComponent>
    </div>
  );
}

export default Menu;
