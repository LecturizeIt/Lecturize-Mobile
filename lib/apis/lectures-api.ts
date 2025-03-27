import { Lecture, LectureImageResponse, Tag } from "@/types/lecture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
import { LectureFormValues } from "../schemas/lecture-schema";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchLectures = async (): Promise<Lecture[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get<Lecture[]>(`${BASE_URL}/lectures`);
  return response.data;
}

export const fetchLecture = async (id: string): Promise<Lecture> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get<Lecture>(`${BASE_URL}/lectures/${id}`);
  return response.data;
}

export const fetchTags = async (): Promise<Tag[]> => {
  const result = await axios.get(`${BASE_URL}/tags`);
  return result.data;
}

export const putLectureImage = async (file: DocumentPickerAsset, id: string): Promise<LectureImageResponse> => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const formData = new FormData();

  // formData.append("file", file);

  //@ts-expect-error
  formData.append("file", {
    uri: file.uri,
    type: file.mimeType,
    name: file.name,
    fileName: file.name,
    size: file.size!
  });

  formData.append("description", file.name);

  const response = await axios.putForm(`${BASE_URL}/lectures/${id}/image`, formData, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  return response.data;
}

export const postLecture = async (lecture: LectureFormValues): Promise<Lecture> => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const response = await axios.post<Lecture>(`${BASE_URL}/lectures`, lecture, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  return response.data;
};