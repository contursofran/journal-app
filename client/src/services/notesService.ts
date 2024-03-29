import axios from "axios";
import { apiUrl } from "../utils/constants";
import { getAuth } from "firebase/auth";

export interface NoteService {
  _id: string;
  body: string;
  createdAt: Date;
}

const getNotes = async (): Promise<NoteService[]> => {
  try {
    const token = await getAuth().currentUser?.getIdToken();

    const response = await axios.get(`${apiUrl}/notes/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fixNotes = response.data.map((note: NoteService) => ({
      ...note,
      createdAt: new Date(new Date(note.createdAt).getTime() + 86400000),
    }));

    return fixNotes;
  } catch (error) {
    return [];
  }
};

const updateNote = async (_id: string, body: string) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();
    const response = await axios.put(
      `${apiUrl}/notes/${_id}`,
      { body },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createNote = async (
  body: string,
  createdAt: Date
): Promise<NoteService | null> => {
  try {
    const token = await getAuth().currentUser?.getIdToken();
    const response = await axios.post(
      `${apiUrl}/notes`,
      {
        body,
        createdAt: new Date(createdAt.getTime() - 86400000),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteNote = async (_id: string) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();
    const response = await axios.delete(`${apiUrl}/notes/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getNotes, updateNote, createNote, deleteNote };
