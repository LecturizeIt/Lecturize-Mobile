import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { ChartData, ChartType } from "@/types/chart";
import { useMemo } from "react";

export const useLectureChartsData = (chartType: ChartType) => {
  const lecturesQuery = useLecturesQuery();

  const chartData: ChartData[] | undefined = useMemo(() => lecturesQuery.data?.map(lecture => {
    return {
      name: lecture.title,
      data: chartType === ChartType.MOST_SHARED ? lecture.metrics.timesShared : lecture.metrics.timesVisited
    }
  }).sort((a, b) => a.data! - b.data!), [lecturesQuery.data, chartType]);

  return { chartData, lecturesQuery }
}