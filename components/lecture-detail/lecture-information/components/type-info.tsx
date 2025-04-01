import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LectureTypes } from "@/types/lecture";
import { Lecture } from "@/types/lecture";
import { Href, Link } from "expo-router";
import { LinkIcon, MapPin } from "lucide-react-native";

const TypeInfo = ({ lecture: { type, address, url } }: { lecture: Lecture }) => {
  switch (type) {
    case LectureTypes.ONLINE:
      return <OnlineInfo url={url} />
    case LectureTypes.PRESENTIAL:
      return <PresentialInfo address={address} />
    case LectureTypes.HYRBID:
      return (
        <>
          <OnlineInfo url={url} />
          <PresentialInfo address={address} />
        </>
      )
  }
}

const OnlineInfo = ({ url }: { url: string }) => {
  return (
    <Link href={url as Href}>
      <HStack className="w-full gap-2 items-center">
        <Icon as={LinkIcon} className="text-typography-600" />
        <Text className="text-typography-500 text-md flex-1 flex-wrap underline">{url}</Text>
      </HStack>
    </Link>
  )
}

const PresentialInfo = ({ address }: { address: string }) => {
  return (
    <HStack className="w-full gap-2 items-center">
      <Icon as={MapPin} className="text-typography-600" />
      <Text className="text-typography-500 text-md flex-1 flex-wrap">{address}</Text>
    </HStack>
  )
}

export default TypeInfo;
