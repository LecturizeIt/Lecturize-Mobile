import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { Box } from '@/components/ui/box';
import { ChartData } from "@/types/chart";
import { Lecture } from "@/types/lecture";
import { useFont } from '@shopify/react-native-skia';
import { useColorScheme } from "nativewind";
import { View } from 'react-native';
import colors from "tailwindcss/colors";
import { Bar, CartesianChart } from "victory-native";

type LectureChartProps = {
  currentLecture: Lecture,
  chartData: ChartData[]
}

const LectureChart = ({ currentLecture, chartData }: LectureChartProps) => {
  const font = useFont(spaceMono, 12);
  const { colorScheme } = useColorScheme();
  const labelColor = colorScheme === "dark" ? "#fff" : "#000";

  return (
    <View className='flex-1 items-center'>
      <Box className='h-[300px] w-full'>
        <CartesianChart
          data={chartData!}
          xKey="name"
          yKeys={["data", "id"]}
          domainPadding={{ left: 25, right: 25, top: 30 }}
          padding={5}
          axisOptions={{
            font,
            labelColor: labelColor,
            formatXLabel: (value) => {
              if (value !== currentLecture.title) return "";
              return value.slice(0, 3) + "...";
            },
          }}
        >
          {({ points, chartBounds }) => {
            return points.data.map((point, index) => {
              const currentBarId = points.id[index].yValue;
              return (
                <Bar
                  key={index}
                  barCount={points.data.length}
                  points={[point]}
                  chartBounds={chartBounds}
                  roundedCorners={{ topLeft: 10, topRight: 10 }}
                  color={currentBarId===Number(currentLecture.id) ? colors.purple[700] : colors.zinc[400]}
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