/* eslint-disable no-underscore-dangle */
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.models";
import { NoteModel } from "../models/note.models";

const createNote = async (req: Request, res: Response) => {
  const note = new NoteModel({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.body,
  });

  const user = await UserModel.findById(req.user.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }
  user.notes.push(note._id);

  try {
    await user.save();
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }

  return user;
};

const getNotes = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const notes = await NoteModel.find({ _id: { $in: user.notes } });

  res.send(notes);

  return user;
};

const updateNote = async (req: Request, res: Response) => {
  if (req.user.uid === req.params.id) {
    const note = await NoteModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { body: req.body.body } },
      { new: true }
    );

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.send(note);

    return note;
  }
  return res.status(401).send("Unauthorized");
};

export { createNote, getNotes, updateNote };
