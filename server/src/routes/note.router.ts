import express from "express";
import { validateJoi, Schemas } from "../middleware/joi";
import {
  createNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller";

const router = express.Router();

router.post("/", validateJoi(Schemas.note.create), createNote);

router.get("/:email", getNotes);

router.put("/:id", validateJoi(Schemas.note.update), updateNote);

export { router as notesRouter };
