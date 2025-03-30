import Logo from "@/assets/images/logo.png";
import LectureInformation from "@/components/lecture-information";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Share2 } from "lucide-react-native";
import { ScrollView, StyleSheet } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const imageUrl = `${BASE_URL}/lectures/${id}/image`;
  return (
    <ScrollView
      className="flex flex-1 px-5 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32, justifyContent: "center" }}
    >
      <VStack className="w-full flex-1 items-center gap-[1rem] relative">
        <Card size="md" variant="elevated" className="m-3 shadow-2xl w-full relative">
          <Image
            source={imageUrl}
            className="w-full h-[200px]"
            contentFit="contain"
            style={styles.image}
            placeholder={Logo}
            key={id}
          />
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

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  }
})