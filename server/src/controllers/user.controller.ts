import { Request, Response } from "express";
import { UserModel } from "../models/user.models";

const createUser = async (req: Request, res: Response) => {
  const user = new UserModel({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(`error!!: ${err}`);
  }
};

const getUserName = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user.uid);
    res.send(user);
  } catch (err) {
    res.status(404).send("User not found");
  }
};

export { createUser, getUserName };
