import Logo from "@/assets/images/logo.png";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import useBase64Image from "@/hooks/use-base64-image";
import { Lecture as LectureType } from "@/types/lecture";
import { formatDate } from "@/utilities/utils";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Image, Pressable } from "react-native";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const LectureCard = ({ lecture }: { lecture: LectureType }) => {
  const image = useBase64Image(`${BASE_URL}/lectures/${lecture.id}/image`);
  return (
    <>
      <Card size="md" variant="elevated" className="m-3 pb-[1rem] shadow-2xl" key={lecture.id}>
        <Link href={{ pathname: "/lecture/[id]", params: { id: lecture.id } }} className="w-full">
          <Image
            source={image ? { uri: image } : Logo}
            className="w-full h-[200px]"
            resizeMode="contain"
          />
        </Link>
        <Text className="text-sm font-normal mb-2 mt-4 text-typography-700">
          {formatDate(lecture.createdAt)}
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
