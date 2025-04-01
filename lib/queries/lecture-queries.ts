import { useQuery } from "@tanstack/react-query";
import { fetchLecture, fetchLectures, fetchTags, getLectureImageJson } from "../apis/lectures-api";

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lecture", "list"],
});

export const useLectureDetailQuery = (id: string) => {
  return useQuery({
    queryFn: () => fetchLecture(id),
    queryKey: ["lecture", "detail", id],
  });
}

export const useTagsQuery = () => useQuery({
  queryFn: fetchTags,
  queryKey: ["tags", "list"],
});

export const useLectureImage = (id: string) => {
  return useQuery({
    queryFn: () => getLectureImageJson(id),
    queryKey: ["lecture", "detail", "image", id]
  });
}
