import { Slider as SliderComponent } from "@mantine/core";
import { useStyles } from "./Menu.styles";

const MARKS = [
  { value: 0, label: "10px" },
  { value: 25, label: "12px" },
  { value: 50, label: "14px" },
  { value: 75, label: "16px" },
  { value: 100, label: "18px" },
];

function Slider() {
  const { classes } = useStyles();

  return (
    <SliderComponent
      className={classes.slider}
      label={(val) => MARKS.find((mark) => mark.value === val)?.label}
      defaultValue={50}
      step={25}
      marks={MARKS}
      styles={{ markLabel: { display: "none" } }}
    />
  );
}

export { Slider };
