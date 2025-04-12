import { LectureSearchParams } from "@/types/lecture";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchLecture,
  fetchLectureComments,
  fetchLectures,
  fetchPaginatedLectures,
  fetchTags,
  fetchUserParticipatingLectures,
  getLectureImageJson
} from "../apis/lectures-api";

export const useLecturesQuery = (params: LectureSearchParams) => useQuery({
  queryFn: () => fetchLectures(params),
  queryKey: ["lecture", "list", { ...params }],
});

export const useInfiniteLectureQueries = (params: LectureSearchParams) => useInfiniteQuery({
  queryKey: ["lecture", "list", { ...params }],
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

export const useLectureCommentsQuery = (id: string) => useQuery({
  queryFn: () => fetchLectureComments(id),
  queryKey: ["lecture", "detail", "comment", id]
})

export const useUserParticipatingLectures = () => useQuery({
  queryFn: fetchUserParticipatingLectures,
  queryKey: ["lecture", "detail", "participating"],
})