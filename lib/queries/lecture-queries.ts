import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchLecture, fetchLectures, fetchPaginatedLectures, fetchTags, getLectureImageJson } from "../apis/lectures-api";

type InfiniteQueriesParams = {
  q?: string,
  sort?: string,
  tags?: string,
  lecturer?: string,
}

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lecture", "list"],
});

export const useInfiniteLectureQueries = ({ q, sort, tags, lecturer }: InfiniteQueriesParams) => useInfiniteQuery({
  queryKey: ["lecture", "list", { q, sort, tags, lecturer }],
  queryFn: ({ pageParam }) => fetchPaginatedLectures({ pageParam, q, sort, tags, lecturer }),
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
