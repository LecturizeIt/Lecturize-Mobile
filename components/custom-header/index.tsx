import Logo from "@/assets/images/logo.png";
import { HStack } from '@/components/ui/hstack';
import { DrawerHeaderProps, DrawerToggleButton } from '@react-navigation/drawer';
import { getHeaderTitle, HeaderButton, HeaderTitle } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({ route, options }: DrawerHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView>
      <HStack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingEnd: 10, paddingBottom: 10 }}>
        <DrawerToggleButton tintColor={`${colorScheme === "light" ? "#000" : "#fff"}`} />
        <HeaderTitle style={{ position: "relative", top: 3, left: 10 }}>
          {title}
        </HeaderTitle>
        <HeaderButton onPress={() => router.push("/")}>
          <Image
            source={Logo}
            style={{ width: "100%", maxWidth: 50, height: 40, position: "relative", top: 5 }}
            alt="project logo"
          />
        </HeaderButton>
      </HStack>
    </SafeAreaView>
  )
}

export default CustomHeader;
