import { useQuery } from "@tanstack/react-query";
import { fetchLectures } from "../apis/lectures-api";

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lectures"],
});