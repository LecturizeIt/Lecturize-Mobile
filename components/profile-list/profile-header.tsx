import { Image } from "expo-image";
import { Box } from "../ui/box";
import { Text } from "../ui/text";

const ProfileHeader = ({ username }: { username: string }) => {
  return (
    <>
      <Box className="w-full pb-3 justify-center items-center">
        <Image
          source={"https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif"}
          style={{ height: 100, width: 100, alignSelf: "center", borderRadius: 999 }}
          contentFit="cover"
          className="rounded-full border border-accent"
        />
        <Text className='mt-1 text-lg text-typography-600'>{username}</Text>
      </Box>
    </>
  )
}

export default ProfileHeader;
