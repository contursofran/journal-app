import mongoose from "mongoose";

export interface Note {
  body: string;
  createdAt: Date;
}

export interface NoteDocument extends mongoose.Document, Note {}

const noteSchema = new mongoose.Schema(
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
