import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import SuspenseLoading from '@/components/suspense-loading';
import { Box } from '@/components/ui/box';
import { useLectureChartsData } from '@/hooks/use-lecture-charts-data';
import { ChartData } from "@/types/chart";
import { useFont } from '@shopify/react-native-skia';
import { useColorScheme } from "nativewind";
import { View } from 'react-native';
import colors from "tailwindcss/colors";
import { Bar, CartesianChart } from "victory-native";

type LectureChartProps = {
  currentLectureTitle: string,
  chartData: ChartData[]
}

const LectureChart = ({ currentLectureTitle, chartData }: LectureChartProps) => {
  const font = useFont(spaceMono, 12);
  const { colorScheme } = useColorScheme();
  const labelColor = colorScheme === "dark" ? "#fff" : "#000";

  return (
    <View className='flex-1 items-center'>
      <Box className='h-[300px] w-full'>
        <CartesianChart
          data={chartData!}
          xKey="name"
          yKeys={["data"]}
          domainPadding={{ left: 25, right: 25, top: 30 }}
          padding={5}
          axisOptions={{
            font,
            labelColor: labelColor,
            formatXLabel: (value) => {
              if (value !== currentLectureTitle) return "";
              return value.slice(0, 3) + "...";
            },
          }}
        >
          {({ points, chartBounds }) => {
            return points.data.map((point, index) => {
              return (
                <Bar
                  key={index}
                  barCount={points.data.length}
                  points={[point]}
                  chartBounds={chartBounds}
                  roundedCorners={{ topLeft: 10, topRight: 10 }}
                  color={point.xValue===currentLectureTitle ? colors.purple[700] : colors.zinc[400]}
                  labels={{ position: "top", font, color: labelColor }}
                />
              )
            })
          }}
        </CartesianChart>
      </Box>
    </View>
  );
}

export default LectureChart;