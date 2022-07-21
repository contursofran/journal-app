import { Request, Response } from "express";
import { UserModel } from "../models/user.models";

const createUser = async (req: Request, res: Response) => {
  const user = new UserModel({
    // eslint-disable-next-line no-underscore-dangle
    _id: req.body._id,
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
  try {
    if (req.params.email === req.user.email) {
      const user = await UserModel.findOne({ email: req.params.email });

      res.send(user);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(404).send("User not found");
  }
};

export { createUser, getUserName };
