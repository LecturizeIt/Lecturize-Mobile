import { Lecture, Tag } from "@/types/lecture";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchLectures = async (): Promise<Lecture[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get<Lecture[]>(`${BASE_URL}/lectures`);
  return response.data;
};

export const fetchLecture = async (id: string): Promise<Lecture> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get<Lecture>(`${BASE_URL}/lectures/${id}`);
  return response.data;
}

export const fetchTags = async (): Promise<Tag[]> => {
  const result = await axios.get(`${BASE_URL}/tags`);
  return result.data;
}