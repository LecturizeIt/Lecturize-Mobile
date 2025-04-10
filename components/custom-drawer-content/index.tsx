import { Text } from "@/components/ui/text";
import { useAuthContext } from "@/contexts/auth-context";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Box } from "../ui/box";

const CustomDrawerContent = (props: any) => {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <DrawerContentScrollView {...props}>
      {isAuthenticated ? (
        <Link href="/profile">
          <Box className="w-full pb-3 justify-center items-center">
            <Image
              source={"https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif"}
              style={{ height: 100, width: 100, alignSelf: "center", borderRadius: 999 }}
              contentFit="cover"
              className="rounded-full border border-accent"
            />
            <Text className='mt-1 text-lg text-typography-600'>{user?.username}</Text>
          </Box>
        </Link>
      ) : null}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent;