import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useLectureShareMutation, useLectureVisitMutation } from "@/lib/mutations/lecture-mutations";
import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { Eye, Share2 } from "lucide-react-native";
import { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

const LectureStats = ({ id }: { id: string }) => {
  const { data: lecture, isLoading, isError } = useLectureDetailQuery(id);
  const visitMutation = useLectureVisitMutation();
  const shareMutation = useLectureShareMutation();

  useEffect(() => {
    visitMutation.mutate(id);
    // eslint-disable-next-line
  }, []);

  const handleLectureShare = async () => {
    shareMutation.mutate(id);
  }

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <HStack className="items-center gap-6 justify-center w-full relative">
        <Box className="flex-row gap-2 items-center">
          <Icon as={Share2} size="md" className="color-typography-500" />
          <Text className="text-typography-400">{lecture?.metrics.timesShared}</Text>
        </Box>
        <Button size="xs" className="w-full max-w-[120px]" variant="outline" onPress={handleLectureShare}>
          <ButtonText>Compartilhar</ButtonText>
          <ButtonIcon as={Share2} />
        </Button>
        <Box className="flex-row gap-2 items-center">
          <Icon as={Eye} className="color-typography-500" />
          <Text className="text-typography-400">{lecture?.metrics.timesVisited}</Text>
        </Box>
      </HStack>
    </>
  )
}

export default LectureStats;
