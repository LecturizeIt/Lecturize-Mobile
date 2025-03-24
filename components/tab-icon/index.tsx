import { View } from "react-native";
import { Box } from "../ui/box";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";

const TabIcon = ({ icon, focused, title, color }: { icon: any, focused: boolean, title?: string, color: string }) => {
  if (focused) {
    return (
      <Box className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'>
        <Icon as={icon} className='m-2' size="xl" color={color} />
        {title && (
          <Text className='text-typography-950 text-base font-semibold ml-2'>{title}</Text>
        )}
      </Box>
    )
  }

  return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      <Icon as={icon} className='m-2 size-4' color={color} />
    </View>
  )
}

export default TabIcon;
