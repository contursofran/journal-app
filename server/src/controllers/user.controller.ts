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

const getUserName = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(404).send("User not found");
  }
};

export { createUser, getUserName };
