import { getAuth } from "@firebase/auth";
import axios from "axios";
import { apiUrl } from "../common/constants";

export interface NoteService {
  id: number;
  date: Date;
  body: string;
}

const getNotes = async (
  email: string,
  setError: (error: string) => void
): Promise<NoteService[] | null> => {
  try {
    const token = await getAuth().currentUser?.getIdToken();

    const response = await axios.get(`${apiUrl}/notes/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
      return null;
    }
    return null;
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
