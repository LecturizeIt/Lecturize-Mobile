import { Button, ButtonText } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const ProfilePage = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <View className='flex-1 items-center justify-center gap-6'>
        <Text className='color-purple-500 font-bold text-xl'>Not Authenticated</Text>
        <Link href="/login" asChild>
          <Button className='bg-purple-500'>
            <ButtonText className='color-white'>
              Authenticate
            </ButtonText>
          </Button>
        </Link>
      </View>
    )
  }

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='color-purple-500 font-bold text-xl'>Profile</Text>
    </View>
  );
}

export default ProfilePage;