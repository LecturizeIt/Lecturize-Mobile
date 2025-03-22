import Highlight from "@/assets/images/highlight.png";
import { Box } from "@/components/ui/box";
import { Icon } from '@/components/ui/icon';
import { ImageBackground } from '@/components/ui/image-background';
import { Text } from '@/components/ui/text';
import { useAuthContext } from '@/contexts/auth-context';
import { Tabs } from 'expo-router';
import { Home, PlusCircle, User } from "lucide-react-native";
import { Image, View } from 'react-native';

const Layout = () => {
  const { user } = useAuthContext();
  const isLogged = Boolean(user);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#962dff",
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          // position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center"
        }
      }}>

      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={Home} focused={focused} title="Home" />,
        }}
      />
      <Tabs.Screen
        name='empty'
        options={{
          title: "empty",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={PlusCircle} focused={focused} />,
          // href: isLogged ? "/profile" : null
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Profile" />,
          href: isLogged ? "/profile" : null
        }}
      />
      <Tabs.Screen
        name='login'
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Login" />,
          href: isLogged ? null : "/login"
        }}
      />
      <Tabs.Screen
        name='register'
        options={{
          title: "Register",
          // tabBarIcon: ({ color }) => <Icon as={User} className='m-2 size-4' color={color} />,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Register" />,
          href: null,
        }}

      />

    </Tabs>
  );
}

const TabIcon = ({ icon, focused, title, color }: { icon: any, focused: boolean, title?: string, color: string }) => {
  if (focused) {
    return (
      <Box className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'>
        <Icon as={icon} className='m-2' color={color} />
        {title && (
          <Text className='text-base font-semibold ml-2'>{title}</Text>
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

export default Layout;