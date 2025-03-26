import { useQuery } from "@tanstack/react-query";
import { fetchLecture, fetchLectures } from "../apis/lectures-api";

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lecture", "list"],
  // throwOnError: (error) => isAxiosError(error) ? error.response?.status === 500 : false
});

export const useLectureDetailQuery = (id: string) => {
  return useQuery({
    queryFn: () => fetchLecture(id),
    queryKey: ["lecture", "detail", id],
  });
}