import { useAuthContext } from "@/contexts/auth-context";
import { Href, useRouter } from "expo-router";
import { PropsWithChildren, useEffect } from "react";

type ProtectedRouteProps = {
  redirectTo: Href,
}

const ProtectedRoute = ({ children, redirectTo }: PropsWithChildren<ProtectedRouteProps>) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;
