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
};

export { createNote };
