import Logo from "@/assets/images/logo.png";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LectureSummary } from "@/types/lecture";
import { formatDateTime } from "@/utilities/utils";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ArrowRight, Eye, Share2 } from "lucide-react-native";
import { FlatList, StyleSheet } from "react-native";
import TagBadge from "../tag-badge";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { memo } from "react";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureCard = memo(function LectureCard({ lecture }: { lecture: LectureSummary }) {
  const imageUrl = `${BASE_URL}/lectures/${lecture.id}/image`
  return (
    <>
      <Card size="md" className="shadow-2xl rounded-xl mb-6">
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
        <FlatList
          data={lecture.tags.slice(0, 5)}
          keyExtractor={(item, index) => `${item}_${index}`}
          horizontal
          renderItem={({ item: name }) => <TagBadge name={name} />}
          scrollEnabled
          showsHorizontalScrollIndicator
          style={{ gap: 2 }}
          contentContainerStyle={{ gap: 6 }}
          initialNumToRender={2}
          className="mb-1"
        />
        <Heading size="lg" className="mb-1">
          {lecture.title}
        </Heading>
        <Link href={{ pathname: "/lecture/[id]", params: { id: lecture.id } }}>
          <HStack className="mt-2 justify-between items-center w-full">
            <HStack className="items-center">
              <Text className="color-purple-500 font-semibold">Ver Palestra</Text>
              <Icon as={ArrowRight} className="color-purple-500  mt-0.5 ml-0.5" size="sm" />
            </HStack>
            <HStack className="gap-3">
              <HStack className="items-center gap-1">
                <Text className="text-md text-typography-300">{lecture.metrics.timesShared}</Text>
                <Icon as={Share2} className="text-typography-300 mt-1" />
              </HStack>
              <HStack className="items-center gap-1 ms-auto">
                <Text className="text-md text-typography-300">{lecture.metrics.timesVisited}</Text>
                <Icon as={Eye} className="text-typography-300 mt-1" />
              </HStack>
            </HStack>
          </HStack>
        </Link>
      </Card>
    </>
  )
})

export default LectureCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  }
})