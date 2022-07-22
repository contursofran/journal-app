import express from "express";
import { validateJoi, Schemas } from "../middleware/validation";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller";

const router = express.Router();

router.post("/", validateJoi(Schemas.note.create), createNote);

router.get("/", getNotes);

router.put("/:id", validateJoi(Schemas.note.update), updateNote);

router.delete("/:id", deleteNote);

export { router as notesRouter };
