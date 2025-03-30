import LectureHeader from "@/components/lecture-detail/lecture-header";
import LectureInformation from "@/components/lecture-detail/lecture-information";
import LectureStats from "@/components/lecture-detail/lecture-stats";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ScrollView
      className="flex flex-1 px-5 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", minHeight: "100%", paddingBottom: 10, paddingTop: 32, justifyContent: "center" }}
      key={id}
    >
      <VStack className="w-full flex-1 items-center gap-[1rem] relative">
        <LectureHeader id={id} />
        <LectureStats id={id} />
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
  },
})