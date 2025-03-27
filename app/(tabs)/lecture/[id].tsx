import Logo from "@/assets/images/logo.png";
import LectureInformation from "@/components/lecture-detail";
import { Card } from "@/components/ui/card";
import useBase64Image from "@/hooks/use-base64-image";
import { useLocalSearchParams, useSegments } from "expo-router";
import { Image, ScrollView } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const image = useBase64Image(`${BASE_URL}/lectures/${id}/image`);
  const segments = useSegments();

  console.log(segments);

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
      <LectureInformation id={id} />
    </ScrollView>
  )
}

export default LectureDetailPage;
