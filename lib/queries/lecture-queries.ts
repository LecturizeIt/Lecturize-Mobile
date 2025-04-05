import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchLecture, fetchLectures, fetchPaginatedLectures, fetchTags, getLectureImageJson } from "../apis/lectures-api";

type LectureQueryParams = {
  q?: string,
  sort?: string,
  tags?: string,
  lecturer?: string,
  size?: number
}

export const useLecturesQuery = (params: LectureQueryParams) => useQuery({
  queryFn: () => fetchLectures(params),
  queryKey: ["lecture", "list", {...params}],
});

export const useInfiniteLectureQueries = (params: LectureQueryParams) => useInfiniteQuery({
  queryKey: ["lecture", "list", {...params}],
  queryFn: ({ pageParam }) => fetchPaginatedLectures({ pageParam, ...params }),
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.next,
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
