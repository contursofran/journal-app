import mongoose, { Document, Schema } from "mongoose";

export interface User {
  name: string;
  _id: string;
  email: string;
  notes: string[];
}

export interface UserDocument extends Document, User {
  _id: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  _id: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export { UserModel };
