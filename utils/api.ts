import axios from "axios";
import { Note } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await axios.get<Note[]>(API_URL);
  return response.data;
};
