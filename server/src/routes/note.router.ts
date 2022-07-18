import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller";

const router = express.Router();

router.post("/", createNote);

router.get("/", getNotes);

router.put("/:id", updateNote);

export { router as notesRouter };
