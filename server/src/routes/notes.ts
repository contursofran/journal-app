import express from "express";
import notesService from "../services/notesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const notes = notesService.getNotes();

  res.json(notes);
});

export default router;
