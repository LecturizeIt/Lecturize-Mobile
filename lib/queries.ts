import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./apis/auth-api";

export const useUserQuery = () => useQuery({
  queryKey: ["user"],
  queryFn: fetchUser,
})