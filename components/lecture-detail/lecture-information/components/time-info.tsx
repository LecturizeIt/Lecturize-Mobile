import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Lecture } from "@/types/lecture";
import { formatDateTimeToSentence } from "@/utilities/utils";
import { Calendar1 } from "lucide-react-native";

const TimeInfo = ({ lecture }: { lecture: Lecture }) => {
  return (
    <>
      <HStack className="w-full gap-2 items-center">
        <Icon as={Calendar1} className="text-typography-600" />
        <Text className="text-typography-500 text-md flex-1 flex-wrap">{formatDateTimeToSentence(lecture?.startsAt!, lecture?.endsAt!)}</Text>
      </HStack>
    </>
  )
}

export default TimeInfo;
