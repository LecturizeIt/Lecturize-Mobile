import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { LectureSearchParams } from "@/lib/schemas/lecture-search-params-schema";
import { ChartData, ChartType } from "@/types/chart";
import { Lecture } from "@/types/lecture";
import { useMemo } from "react";

export const useLectureChartsData = (chartType: ChartType, currentLecture: Lecture) => {
  const sortMetric: LectureSearchParams["sort"] = chartType === ChartType.MOST_SHARED ? "metrics.timesShared,desc" : "metrics.timesVisited,desc"
  const lecturesQuery = useLecturesQuery({ size: 10, sort: sortMetric });

  const chartData: ChartData[] | undefined = useMemo(() => lecturesQuery.data?.map(lecture => {
    return {
      name: lecture.title,
      data: chartType === ChartType.MOST_SHARED ? lecture.metrics.timesShared : lecture.metrics.timesVisited,
      id: Number(lecture.id)
    }
  }).sort((a, b) => a.data! - b.data!), [lecturesQuery.data, chartType]);

  fortmatData(chartData, currentLecture, chartType);

  return { chartData, lecturesQuery }
};

const fortmatData = (chartData: ChartData[] | undefined, currentLecture: Lecture, chartType: ChartType) => {
  const currentLectureInChartData = chartData?.some(c => c.id === Number(currentLecture.id));
  if (chartData && !currentLectureInChartData) {
    chartData[0] = {
      data: chartType === ChartType.MOST_SHARED ? currentLecture.metrics.timesShared : currentLecture.metrics.timesVisited,
      id: Number(currentLecture.id),
      name: currentLecture.title,
    };
  }
}