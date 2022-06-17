import { Note } from "../types";
import axios, { Axios } from "axios";
import { apiUrl } from "../constants";

const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await axios.get(`${apiUrl}/notes`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getNotes };
