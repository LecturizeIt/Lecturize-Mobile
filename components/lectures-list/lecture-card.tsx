import Logo from "@/assets/images/logo.png";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Lecture as LectureType } from "@/types/lecture";
import { formatDateTime } from "@/utilities/utils";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureCard = ({ lecture }: { lecture: LectureType }) => {
  const imageUrl = `${BASE_URL}/lectures/${lecture.id}/image`
  return (
    <>
      <Card size="md" variant="elevated" className="shadow-2xl bg-background-card rounded-xl mb-6" key={lecture.id}>
        <Link href={{ pathname: "/lecture/[id]", params: { id: lecture.id } }} className="w-full">
          <Image
            source={imageUrl}
            className="w-full h-[200px]"
            contentFit="contain"
            style={styles.image}
            placeholder={Logo}
            transition={1000}
            cachePolicy={"none"}
          />
        </Link>
        <Text className="text-sm font-normal mb-2 mt-4 text-typography-700">
          {formatDateTime(lecture.createdAt)}
        </Text>
        <Heading size="lg" className="mb-1">
          {lecture.title}
        </Heading>
        <Link href={{ pathname: "/lecture/[id]", params: { id: lecture.id } }} className="mt-2">
          <HStack className="items-center">
            <Text className="color-purple-500 font-semibold">Ver Palestra</Text>
            <Icon as={ArrowRight} className="color-purple-500  mt-0.5 ml-0.5" size="sm" />
          </HStack>
        </Link>
      </Card>
    </>
  )
}

export default LectureCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  }
})