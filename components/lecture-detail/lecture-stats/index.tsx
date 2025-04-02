import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useLectureShareMutation, useLectureVisitMutation } from "@/lib/mutations/lecture-mutations";
import { useLectureDetailQuery } from "@/lib/queries/lecture-queries";
import { ChartColumn, Eye, Share2 } from "lucide-react-native";
import { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TouchableHighlight } from "react-native";
import LectureChartModal from "./components/lecture-chart-modal";
import { useLectureChartsData } from "@/hooks/use-lecture-charts-data";
import { ChartType } from "@/types/chart";
import ShareLectureMenu from "./components/share-lecture-popover";
import ShareLecturePopover from "./components/share-lecture-popover";

const LectureStats = ({ id }: { id: string }) => {
  const visitMutation = useLectureVisitMutation();
  const shareMutation = useLectureShareMutation();
  const { data: lecture, isLoading, isError } = useLectureDetailQuery(id);

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
        <LectureChartModal currentLecture={lecture!} chartType={ChartType.MOST_SHARED}>
          <Box className="flex-row gap-2 items-center">
            <Icon as={Share2} size="md" className="color-typography-500" />
            <Text className="text-typography-400">{lecture?.metrics.timesShared}</Text>
          </Box>
        </LectureChartModal>
        <ShareLecturePopover handleLectureShare={handleLectureShare} />
        <LectureChartModal currentLecture={lecture!} chartType={ChartType.MOST_VIEWED}>
          <Box className="flex-row gap-2 items-center">
            <Icon as={Eye} className="color-typography-500" />
            <Text className="text-typography-400">{lecture?.metrics.timesVisited}</Text>
          </Box>
        </LectureChartModal>
      </HStack>
      <HStack className="items-center justify-center w-full">
      </HStack>
    </>
  )
}

export default LectureStats;
