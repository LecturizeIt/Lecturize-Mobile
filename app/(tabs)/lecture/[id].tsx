import Logo from "@/assets/images/logo.png";
import LectureInformation from "@/components/lecture-information";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import useBase64Image from "@/hooks/use-base64-image";
import { useLocalSearchParams } from "expo-router";
import { Share2 } from "lucide-react-native";
import { Image, ScrollView } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const image = useBase64Image(`${BASE_URL}/lectures/${id}/image`);

  return (
    <ScrollView
      className="flex flex-1 px-5 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32, justifyContent: "center" }}
    >
      <VStack className="w-full flex-1 items-center gap-[1rem] relative">
        <Card size="md" variant="elevated" className="m-3 shadow-2xl w-full relative">
          <Image
            source={image ? { uri: image } : Logo}
            className="w-full h-[200px]"
            resizeMode="contain"
          />

          {/*  absolute -bottom-[10] left-[36%] */}
        </Card>
        <Button size="xs" className="w-full max-w-[120px]" variant="outline">
          <ButtonText>Compartilhar</ButtonText>
          <ButtonIcon as={Share2} />
        </Button>
        <LectureInformation id={id} />
      </VStack>

    </ScrollView>
  )
}

export default LectureDetailPage;
