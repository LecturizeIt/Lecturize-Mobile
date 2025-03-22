import AppearanceModal from '@/components/appearance-modal';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

const Settings = () => {
    return (
        <Box className='bg-background-0 flex-1 justify-start p-[5rem] gap-[1rem]'>
          <Heading className='color-primary-900 text-center'>Settings</Heading>
          <AppearanceModal />
        </Box>
    );
}

export default Settings;