import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/apis/auth-api";

export const useUserQuery = (jwt: string) => useQuery({
  queryKey: ["user"],
  queryFn: () => fetchUser(jwt),
  // enabled: false,
})