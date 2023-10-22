import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface Note {
  body: string;
  createdAt: Date;
}

export interface NoteDocument extends Document, Note {}

const noteSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NoteModel = mongoose.model<NoteDocument>("Note", noteSchema);

export { NoteModel };
