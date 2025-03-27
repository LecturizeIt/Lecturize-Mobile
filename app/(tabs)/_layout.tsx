import TabIcon from "@/components/tab-icon";
import { Tabs } from 'expo-router';
import { BookOpenText, PlusCircle, Shield, ShieldAlert, User } from "lucide-react-native";

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
          title: "Lectures",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={BookOpenText} focused={focused} title="Lectures" />,
        }}
      />
      <Tabs.Screen
        name='create-lecture'
        options={{
          title: "Create Lecture",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={PlusCircle} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Profile" />,
        }}
      />
      <Tabs.Screen
        name='lecture'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={User} focused={focused} title="Profile" />,
          href: null
        }}
      />

      <Tabs.Screen
        name="(protected)"
        options={{
          title: "P1",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={ShieldAlert} focused={focused} title="P1" />,
        }}
      />

      {/* <Tabs.Screen
        name="(protected)/protected2"
        options={{
          title: "P2",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} icon={ShieldAlert} focused={focused} title="P2" />,
        }}
      /> */}
    </Tabs>
  );
}

export default Layout;