import { Lecture } from "@/types/lecture";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchLectures = async (): Promise<Lecture[]> => {
  const response = await axios.get<Lecture[]>(`${BASE_URL}/lectures`);
  return response.data;
};