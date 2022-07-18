import express from "express";
import { createNote } from "../controllers/note.controller";

const router = express.Router();

router.post("/create", createNote);

export { router as notesRouter };
