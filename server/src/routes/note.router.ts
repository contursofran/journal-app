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

router.put("/:_id", validateJoi(Schemas.note.update), updateNote);

router.delete("/:_id", deleteNote);

export { router as notesRouter };
