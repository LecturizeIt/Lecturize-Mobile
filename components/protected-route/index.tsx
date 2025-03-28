import { useAuthContext } from "@/contexts/auth-context";
import { useRoute } from "@react-navigation/native";
import { Href, Redirect } from "expo-router";
import { PropsWithChildren } from "react";

type ProtectedRouteProps = {
  directTo: Href,
  redirectAfter?: boolean;
}

const ProtectedRoute = ({ children, directTo, redirectAfter = true }: PropsWithChildren<ProtectedRouteProps>) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRoute();

  const directToRoute = `${directTo}?redirectTo=${redirectAfter ? router.name : "/"}` as Href;

  if (!isAuthenticated) {
    return <Redirect href={directToRoute} />
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;
