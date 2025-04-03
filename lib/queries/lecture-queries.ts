import { useInfiniteQuery, useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchLecture, fetchLectures, fetchPaginatedLectures, fetchTags, getLectureImageJson } from "../apis/lectures-api";

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lecture", "list"],
});

export const useInfiniteLectureQueries = ({ q }: { q: string }) => useInfiniteQuery({
  queryKey: ["lecture", "list", q],
  queryFn: ({ pageParam }) => fetchPaginatedLectures({ pageParam, q }),
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.next,
  placeholderData: keepPreviousData,
})

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
