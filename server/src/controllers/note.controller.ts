/* eslint-disable no-underscore-dangle */
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.models";
import { NoteModel } from "../models/note.models";

const createNote = async (req: Request, res: Response) => {
  const note = new NoteModel({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.body,
    createdAt: req.body.createdAt,
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
  const user = await UserModel.findById(req.user.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const note = await NoteModel.findOneAndUpdate(
    { _id: req.params._id },
    { body: req.body.body },
    { new: true }
  );

  if (!note) {
    return res.status(404).send("Note not found");
  }

  res.send(note);

  return user;
};

const deleteNote = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const note = await NoteModel.findOneAndDelete({ _id: req.params.id });

  if (!note) {
    return res.status(404).send("Note not found");
  }

  user.notes.splice(user.notes.indexOf(note._id), 1);
  await user.save();

  res.send(note);

  return user;
};

export { createNote, getNotes, updateNote, deleteNote };
