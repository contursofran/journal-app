import { Modal, Text, Divider, Group } from "@mantine/core";
import { useStyles } from "./Menu.styles";
import { Slider } from "./Slider";
import { Swatches } from "./Swatches";

function Settings({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

  return (
    <Modal
      classNames={classes}
      centered
      size="sm"
      opened={opened}
      onClose={close}
      title="Settings"
    >
      <Group direction="column">
        <Text className={classes.text} size="md" weight="500">
          Accent Color
        </Text>
        <Swatches />

        <Text className={classes.text} size="md" weight="500">
          Font Size
        </Text>
      </Group>
      <Slider />
    </Modal>
  );
}

export { Settings };
