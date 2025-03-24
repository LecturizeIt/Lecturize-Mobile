import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchLecture, fetchLectures } from "../apis/lectures-api";

export const useLecturesQuery = () => useSuspenseQuery({
  queryFn: fetchLectures,
  queryKey: ["lecture", "list"],
});

export const useLectureDetailQuery = (id: string) => {
  return useQuery({
    queryFn: () => fetchLecture(id),
    queryKey: ["lecture", "detail", id],
  });
}