import ProtectedRoute from '@/components/protected-route';
import { Text, View } from 'react-native';


const ProfilePage = () => {
  return (
    <ProtectedRoute directTo="/login">
      <View className='flex-1 items-center'>
        <Text className='text-accent'>Profile</Text>
      </View>
    </ProtectedRoute>
  );
}

export default ProfilePage;