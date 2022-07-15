import axios from "axios";
import { Note } from "../types";
import { apiUrl } from "../utils/constants";

const getNotes = async (token: string): Promise<Note[]> => {
  try {
    const response = await axios.get(`${apiUrl}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateNote = async (note: Note): Promise<Note> => {
  try {
    const response = await axios.put(`${apiUrl}/notes/${note.id}`, note);
    return response.data;
  } catch (error) {
    console.log(error);
    return note;
  }
};

const createNote = async (note: Note): Promise<Note> => {
  try {
    const response = await axios.post(`${apiUrl}/notes`, note);
    return response.data;
  } catch (error) {
    console.log(error);
    return note;
  }
};

export { getNotes, updateNote, createNote };
