import Logo from "@/assets/images/logo.png";
import SuspenseLoading from "@/components/suspense-loading";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import useBase64Image from "@/hooks/use-base64-image";
import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { formatDate } from "@/utilities/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { Image, ScrollView } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: lecture, isError, isLoading } = useLectureDetailQuery(id as string);
  const image = useBase64Image(`${BASE_URL}/lectures/${lecture?.id}/image`);
  
  if (isError) {
    router.replace("/");
    return;
  }

  if (isLoading) {
    return (
      <Layout image={image}>
        <SuspenseLoading />
      </Layout>
    )
  }

  return (
    <Layout image={image}>
      <Text>{lecture?.title}</Text>
      <Text>
        {formatDate(lecture?.createdAt!)}
      </Text>
    </Layout>
  )
}

const Layout = ({ children, image }: PropsWithChildren<{ image: any }>) => {
  return (
    <ScrollView
      className="flex flex-1 px-5 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32 }}
    >
      <Card size="md" variant="elevated" className="m-3 pb-[1rem] shadow-2xl w-full">
        <Image
          source={image ? { uri: image } : Logo}
          className="w-full h-[200px]"
          resizeMode="contain"
        />
      </Card>

      <Card size="md" variant="elevated" className="m-3 pb-[1rem] flex-1 shadow-2xl w-full">
        {children}
      </Card>

    </ScrollView>
  )
}

export default LectureDetail;
