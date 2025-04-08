import ProtectedRoute from '@/components/protected-route';
import { useAuthContext } from '@/contexts/auth-context';
import { Text, View } from 'react-native';


const ProfilePage = () => {
  const { user } = useAuthContext();
  return (
    <ProtectedRoute directTo="/login">
      <View className='flex-1 items-center justify-center'>
        <Text className='text-accent text-4xl'>{user?.username}</Text>
      </View>
    </ProtectedRoute>
  );
}

export default ProfilePage;