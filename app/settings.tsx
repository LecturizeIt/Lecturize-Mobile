import AppearanceModal from '@/components/appearance-modal';
import LogoutDialog from '@/components/logout-dialog';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useAuthContext } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';

const Settings = () => {
  const { logout, user } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  }

  return (
    <Box className='flex-1 justify-start p-[5rem] gap-[1rem]'>
      <Heading className='color-primary-900 text-center'>Settings</Heading>
      <AppearanceModal />
      {user && <LogoutDialog handleLogout={handleLogout} />}
    </Box>
  );
}

export default Settings;