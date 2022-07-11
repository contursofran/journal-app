import { Slider as SliderComponent } from "@mantine/core";
import { useStore } from "../../../store";
import { useStyles } from "./Settings.styles";

function Slider() {
  const editorFontSize = useStore((state) => state.editorFontSize);

  const { classes } = useStyles();

  const setEditorFontSize = (value: number) => {
    useStore.setState({ editorFontSize: value });
  };

  return (
    <SliderComponent
      className={classes.slider}
      classNames={classes}
      data-cy="font-size-slider"
      defaultValue={editorFontSize}
      label={null}
      step={2}
      min={16}
      max={22}
      size="sm"
      onChange={(val) => setEditorFontSize(val)}
    />
  );
}

export { Slider };
