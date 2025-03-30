import Logo from "@/assets/images/logo.png";
import LectureSettings from "@/components/lecture-detail/lecture-settings";
import { Card } from "@/components/ui/card";
import WithAuthorization from "@/components/with-authorization";
import { useAuthContext } from "@/contexts/auth-context";
import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { Image } from "expo-image";
import { PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const LectureHeader = ({ id }: { id: string }) => {
  const { data: lecture, isLoading, isError } = useLectureDetailQuery(id);
  const { isAdmin, user, isAuthenticated } = useAuthContext();

  const isAuthorized = useMemo(() => {
    const isLectureOrganizer = user?.id === lecture?.organizer.id;
    return isAuthenticated && (isAdmin || isLectureOrganizer);
    // eslint-disable-next-line
  }, [user, lecture]);

  if (isLoading || isError || !isAuthorized) {
    return (
      <Layout id={id} />
    )
  }

  return (
    <Layout id={id}>
      <WithAuthorization isAuthorized={isAuthorized}>
        <LectureSettings id={id} />
      </WithAuthorization>
    </Layout>

  )
}

const Layout = ({ id, children }: PropsWithChildren<{ id: string }>) => {
  const imageUrl = `${BASE_URL}/lectures/${id}/image`;
  return (
    <Card size="md" variant="elevated" className="m-3 shadow-2xl w-full relative">
      <Image
        source={imageUrl}
        className="w-full h-[200px]"
        contentFit="contain"
        style={styles.image}
        placeholder={Logo}
        key={id}
        cachePolicy={"none"}
      />
      {children}
    </Card>
  )
}

export default LectureHeader;


const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
})