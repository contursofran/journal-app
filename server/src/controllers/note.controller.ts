/* eslint-disable no-underscore-dangle */
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.models";
import { NoteModel } from "../models/note.models";

const createNote = async (req: Request, res: Response) => {
  if (req.user.email === req.body.email) {
    const note = new NoteModel({
      _id: new mongoose.Types.ObjectId(),
      body: req.body.body,
    });

    const user = await UserModel.findOne({ email: req.body.email });

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
  }
  return res.status(401).send("Unauthorized");
};

const getNotes = async (req: Request, res: Response) => {
  if (req.params.email === req.user.email) {
    const user = await UserModel.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const notes = await NoteModel.find({ _id: { $in: user.notes } });

    res.send(notes);

    return user;
  }
  return res.status(401).send("Unauthorized");
};

const updateNote = async (req: Request, res: Response) => {
  if (req.user.email === req.body.email) {
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
