import express from "express";
import notesRouter from "./routes/notes";

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
