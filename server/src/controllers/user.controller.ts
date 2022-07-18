import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.models";

const createUser = async (req: Request, res: Response) => {
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addUserNotes = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(404).send("User not found");
  } else {
    user.notes.push(req.body.noteId);

    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

export { createUser, addUserNotes };
