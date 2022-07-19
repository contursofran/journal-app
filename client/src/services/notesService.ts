import axios from "axios";
import { apiUrl } from "../common/constants";

export interface NoteService {
  id: number;
  date: Date;
  body: string;
}

const getNotes = async (token: string): Promise<NoteService[]> => {
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

const updateNote = async (note: NoteService): Promise<NoteService> => {
  try {
    const response = await axios.put(`${apiUrl}/notes/${note.id}`, note);
    return response.data;
  } catch (error) {
    console.log(error);
    return note;
  }
};

const createNote = async (note: NoteService): Promise<NoteService> => {
  try {
    const response = await axios.post(`${apiUrl}/notes`, note);
    return response.data;
  } catch (error) {
    console.log(error);
    return note;
  }
};

export { getNotes, updateNote, createNote };
