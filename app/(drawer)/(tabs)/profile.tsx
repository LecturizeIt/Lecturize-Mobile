import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import ProtectedRoute from '@/components/protected-route';
import SuspenseLoading from '@/components/suspense-loading';
import { Box } from '@/components/ui/box';
import { useLectureChartsData } from '@/hooks/use-lecture-charts-data';
import { useFont } from '@shopify/react-native-skia';
import { Text, View } from 'react-native';
import { Bar, CartesianChart } from "victory-native";


const ProfilePage = () => {
  const font = useFont(spaceMono, 12);
  const { chartViewsData, lecturesQuery } = useLectureChartsData();

  if (lecturesQuery.isLoading) {
    return <SuspenseLoading />
  }

  return (
    <ProtectedRoute directTo="/login">
      <View className='flex-1 items-center'>
        <Text className='text-accent'>Profile</Text>
      </View>
    </ProtectedRoute>
  );
}

export default ProfilePage;