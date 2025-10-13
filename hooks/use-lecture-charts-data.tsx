import { useLecturesQuery } from "@/lib/queries/lecture-queries";
import { SortKey } from "@/lib/schemas/lecture-search-params-schema";
import { ChartData, ChartType } from "@/types/chart";
import { Lecture, LectureSearchParamsParsed } from "@/types/lecture";
import { useMemo } from "react";

export const useLectureChartsData = (chartType: ChartType, currentLecture: Lecture) => {
  const sortMetric: LectureSearchParamsParsed["sort"] = chartType === ChartType.MOST_SHARED ? SortKey.MOST_SHARED : SortKey.MOST_VIEWED;
  const lecturesQuery = useLecturesQuery({ size: 10, sort: sortMetric });

  const chartData: ChartData[] | undefined = useMemo(() => lecturesQuery.data?.map(lecture => {
    return {
      name: lecture.title,
      data: chartType === ChartType.MOST_SHARED ? lecture.metrics.timesShared : lecture.metrics.timesVisited,
      id: Number(lecture.id)
    }
  }).sort((a, b) => a.data! - b.data!), [lecturesQuery.data, chartType]);

  formatData(chartData, currentLecture, chartType);

  return { chartData, lecturesQuery }
};

const formatData = (chartData: ChartData[] | undefined, currentLecture: Lecture, chartType: ChartType) => {
  const currentLectureInChartData = chartData?.some(c => c.id === Number(currentLecture.id));
  if (chartData && !currentLectureInChartData) {
    chartData[0] = {
      data: chartType === ChartType.MOST_SHARED ? currentLecture.metrics.timesShared : currentLecture.metrics.timesVisited,
      id: Number(currentLecture.id),
      name: currentLecture.title,
    };
  }
}