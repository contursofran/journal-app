import { Calendar } from "../../components/Calendar";
import { Editor } from "../../components/Editor";
import { useStyles } from "./Main.styles";

function Main() {
  const { classes } = useStyles();

  return (
    <div className={classes.main}>
      <Calendar />
      <Editor />
    </div>
  );
}

export { Main };
