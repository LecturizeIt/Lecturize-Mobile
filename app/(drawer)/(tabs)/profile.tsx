import ProtectedRoute from '@/components/protected-route';
import { Text, View } from 'react-native';

const ProfilePage = () => {
  return (
    <ProtectedRoute directTo="/login">
      <View className='flex-1 items-center justify-center'>
        <Text className='color-purple-500 font-bold text-xl'>Profile</Text>
      </View>
    </ProtectedRoute>
  );
}

export default ProfilePage;