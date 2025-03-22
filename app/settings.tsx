import AppearanceModal from '@/components/appearance-modal';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';

const Settings = () => {
    return (
        <Box className='bg-background-0 flex-1 justify-start p-[5rem] gap-[1rem]'>
          <Heading className='color-primary-900 text-center'>Settings</Heading>
          <AppearanceModal />
        </Box>
    );
}

export default Settings;