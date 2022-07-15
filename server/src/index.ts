import "dotenv/config";
import express from "express";
import cors from "cors";
import { decodeToken } from "./utils/middleware";
import notesRouter from "./routes/notes";

const app = express();
app.use(cors());
app.use(decodeToken);
app.use(express.json());

const PORT = 3001;

app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
