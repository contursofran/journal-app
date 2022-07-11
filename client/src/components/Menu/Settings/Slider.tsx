import { Slider as SliderComponent } from "@mantine/core";
import { useStore } from "../../../store";
import { useStyles } from "./Settings.styles";

const MARKS = [
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
  { value: 22, label: "22px" },
];

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
      id="font-size-slider"
      label={(val) => MARKS.find((mark) => mark.value === val)?.label}
      defaultValue={editorFontSize}
      step={2}
      min={16}
      max={22}
      size="sm"
      onChange={(val) => setEditorFontSize(val)}
    />
  );
}

export { Slider };
