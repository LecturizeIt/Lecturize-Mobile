import ProfileList from '@/components/profile-list';
import ProtectedRoute from '@/components/protected-route';
import { useAuthContext } from '@/contexts/auth-context';
import { View } from 'react-native';


const ProfilePage = () => {
  const { user } = useAuthContext();
  return (
    <ProtectedRoute directTo="/login">
      <View className="flex flex-1 px-10 w-full pt-4 gap-6">
        <ProfileList {...user!} />
      </View>
    </ProtectedRoute>
  );
}

export default ProfilePage;