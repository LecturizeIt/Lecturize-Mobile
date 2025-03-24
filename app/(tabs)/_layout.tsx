import TabIcon from "@/components/tab-icon";
import { Tabs } from 'expo-router';
import { BookOpenText, Home, User } from "lucide-react-native";

const ACCENT_PURPLE = "#962dff";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACCENT_PURPLE,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          overflow: "hidden",
          borderWidth: 1,

        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        },
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
        name='lectures'
        options={{
          title: "Lectures",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={BookOpenText} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='lecture-detail/[id]'
        options={{
          title: "Lecture Detail",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} />,
          href: null
        }}
      />

    </Tabs>
  );
}

export default Layout;