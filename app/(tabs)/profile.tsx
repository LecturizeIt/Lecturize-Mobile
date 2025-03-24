import { useAuthContext } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';

const Profile = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Redirect href="/login" />

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='color-purple-500 font-bold text-xl'>Profile</Text>
    </View>
  );
}

export default Profile;