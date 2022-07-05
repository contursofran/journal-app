import { Status } from "../../components/Status";
import { useStyles } from "./Footer.styes";

function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Status />
    </div>
  );
}

export { Footer };
