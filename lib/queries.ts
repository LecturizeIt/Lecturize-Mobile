import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./apis/auth-api";

export const useUserQuery = (jwt: string) => useQuery({
  queryKey: ["user"],
  queryFn: () => fetchUser(jwt),
  // enabled: false,
})