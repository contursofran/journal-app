import mongoose, { Document, Schema } from "mongoose";

export interface Note {
  body: string;
}

export interface NoteDocument extends Document, Note {
  createdAt: Date;
  updatedAt: Date;
}

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
