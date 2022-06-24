import express from "express";
import notesService from "../services/notesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const notes = notesService.getNotes();

  res.json(notes);
});

router.put("/:id", (req, res) => {
  const note = notesService.updateNote(req.body);

  res.json(note);
});

export default router;
