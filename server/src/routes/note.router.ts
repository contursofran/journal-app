import express from "express";
import { createNote } from "../controllers/note.controller";

const router = express.Router();

router.post("/create", createNote);

// router.put("/:id", (req, res) => {
//   const note = notesService.updateNote(req.body);

//   res.json(note);
// });

// router.post("/", async (req, res) => {
//   const note = notesService.newNote(req.body);

//   res.json(note);
// });

export default router;
