import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { NoteModel } from "../models/note.models";

const createNote = async (req: Request, res: Response) => {
  const note = new NoteModel({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.body,
  });

  try {
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

export { createNote };
