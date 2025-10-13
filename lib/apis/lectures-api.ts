import { Lecture, LectureComment, LectureImage, LectureSearchParams, LectureSummary, PaginatedLectures, Tag } from "@/types/lecture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
import { LectureCommentFormValues } from "../schemas/lecture-comment-schema";
import { LectureFormValues } from "../schemas/lecture-schema";
import { LectureSearchParamsSchema } from "../schemas/lecture-search-params-schema";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

type FetchLecturesParams = LectureSearchParams & { pageParam: number };

export const fetchLectures = async ({ lecturer, q, sort, tags, size, user }: Omit<FetchLecturesParams, "pageParam">): Promise<LectureSummary[]> => {
  const parsed = LectureSearchParamsSchema.parse({ sort, q, tags, lecturer, size, user });
  const queryStrings = `?size=${parsed.size}&q=${parsed.q}&sort=${parsed.sort}&tags=${parsed.tags}&lecturer=${parsed.lecturer}&user=${parsed.user}`
  const response = await axios.get<PaginatedLectures>(`${BASE_URL}/lectures${queryStrings}`);
  return response.data.results;
};

export const fetchPaginatedLectures = async ({ pageParam, q, sort, tags, lecturer, size }: FetchLecturesParams) => {
  const parsed = LectureSearchParamsSchema.parse({ sort, q, tags, lecturer, size });
  const queryStrings = `?page=${pageParam}&size=${parsed.size}&q=${parsed.q}&sort=${parsed.sort}&tags=${parsed.tags}&lecturer=${parsed.lecturer}`
  const response = await axios.get<PaginatedLectures>(`${BASE_URL}/lectures${queryStrings}`);
  return response.data;
}

export const fetchLecture = async (id: string): Promise<Lecture> => {
  const response = await axios.get<Lecture>(`${BASE_URL}/lectures/${id}`);
  return response.data;
};

export const fetchUserParticipatingLectures = async (): Promise<LectureSummary[]> => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const response = await axios.get<LectureSummary[]>(`${BASE_URL}/user/participating-lectures`, {
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

export const postLectureComment = async ({ comment, id }: { comment: LectureCommentFormValues, id: string }): Promise<LectureComment> => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const response = await axios.post<LectureComment>(`${BASE_URL}/lectures/${id}/comments`, comment, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  return response.data;
}

export const putLecture = async (id: string, lecture: LectureFormValues) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const response = await axios.put<Lecture>(`${BASE_URL}/lectures/${id}`, lecture, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  return response.data;
}

export const deleteLecture = async (id: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  await axios.delete(`${BASE_URL}/lectures/${id}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
};

export const deleteComment = async ({ commentId, lectureId }: { lectureId: string, commentId: string }) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  await axios.delete(`${BASE_URL}/lectures/${lectureId}/comments/${commentId}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
};

export const getLectureImageJson = async (id: string): Promise<LectureImage> => {
  const response = await axios.get<LectureImage>(`${BASE_URL}/lectures/${id}/image`, {
    headers: { Accept: "application/json" }
  });
  return response.data;
};

export const deleteLectureImage = async (id: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  await axios.delete<void>(`${BASE_URL}/lectures/${id}/image`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
};

export const putLectureVisits = async (id: string) => {
  await axios.put<Lecture>(`${BASE_URL}/lectures/${id}/visit`);
};

export const putLectureShares = async (id: string) => {
  await axios.put<Lecture>(`${BASE_URL}/lectures/${id}/share`);
};

export const putParticipateLecture = async (id: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  await axios({
    url: `${BASE_URL}/lectures/${id}/participate`,
    method: "put",
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
}

export const putUnparticipateLecture = async (id: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  await axios({
    url: `${BASE_URL}/lectures/${id}/unparticipate`,
    method: "put",
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
}

export const fetchTags = async (): Promise<Tag[]> => {
  const result = await axios.get<Tag[]>(`${BASE_URL}/tags`);
  return result.data;
};

export const fetchLectureComments = async (id: string): Promise<LectureComment[]> => {
  const result = await axios.get<LectureComment[]>(`${BASE_URL}/lectures/${id}/comments`);
  return result.data;
}

export const putLectureImage = async (file: DocumentPickerAsset, id: string): Promise<LectureImage> => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const formData = new FormData();

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
};

